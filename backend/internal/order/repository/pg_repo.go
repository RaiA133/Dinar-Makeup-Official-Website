package repository

import (
	"bytes"
	"context"
	"fmt"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
	modelUser "github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/pkg/payment"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/pkg/errors"
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"net/url"
)

type orderPGRepository struct {
	db         *gorm.DB
	coreClient coreapi.Client
}

func NewOrderPGRepository(db *gorm.DB, cCL coreapi.Client) order.RepositoryInterface {
	return &orderPGRepository{
		db:         db,
		coreClient: cCL,
	}
}

func (rp *orderPGRepository) InsertOrder(ctx context.Context, data *model.Order) (*model.Order, error) {
	returnVal := data

	err := rp.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&data).Error; err != nil {
			return err
		}

		data.CustomerDetail.OrderID = data.Id
		data.DetailOrder.OrderID = data.Id

		if err := tx.Omit("Id").Create(&data.CustomerDetail).Error; err != nil {
			return err
		}

		if err := tx.Omit("Id").Create(&data.DetailOrder).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return returnVal, nil
}
func (rp *orderPGRepository) FindOrdersData(ctx context.Context, offset, limit int, search string) ([]*model.Order, int64, error) {
	var orders []*model.Order
	var total int64

	DB := rp.db.WithContext(ctx).Model(&model.Order{})

	if search != "" {
		searchPattern := "%" + search + "%"
		DB = DB.Where(`
			id_order text ILIKE ? OR 
			user_id::text ILIKE ? OR 
			product_id::text ILIKE ?`,
			searchPattern, searchPattern, searchPattern)
	}
	if err := DB.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := DB.Offset(offset).Limit(limit).
		Preload("User").
		Preload("Product").
		Preload("DocumentOrders").
		Find(&orders).Error; err != nil {
		return nil, 0, err
	}

	return orders, total, nil
}

func (rp *orderPGRepository) CheckTransaction(ctx context.Context, orderId string) (string, error) {
	var paymentStatus string

	transactionStatus, err := rp.coreClient.CheckTransaction(orderId)
	if err != nil {
		fmt.Println("GACOR 1")
		return "", err
	} else {
		if transactionStatus != nil {
			fmt.Println("GACOR 2")
			paymentStatus = payment.TransactionStatus(transactionStatus)
			return paymentStatus, nil
		}
	}
	return "", errors.New("transaction not found")
}

func (rp *orderPGRepository) GetOrderByID(ctx context.Context, orderId string) (*model.Order, error) {
	type joinResult struct {
		model.Order
		User           modelUser.User       `gorm:"embedded"`
		CustomerDetail model.CustomerDetail `gorm:"embedded"`
		DetailOrder    model.DetailOrder    `gorm:"embedded"`
	}

	var result joinResult

	query := `	
		SELECT 
			o.id_order, o.user_id, o.product_id, o.final_amount, o.installment_amount,
			o.outstanding, o.installment_status, o.va_number, o.order_status,
			o.payment_status, o.payment_method, o.notes, o.wedding_date,
			o.transaction_time, o.expired_va, o.created_at, o.updated_at,

			u.id AS user_id, u.name, u.email, u.phone_number, u.role, -- sesuaikan kolom user
			cd.id AS customer_id, cd.groom_full_name, cd.bride_full_name,
			cd.groom_address, cd.bride_address, cd.groom_email, cd.bride_email,
			cd.groom_instagram, cd.bride_instagram,
			dd.id AS detail_id, dd.akad_date, dd.show_date, dd.location,
			dd.akad_time, dd.guest_count, dd.tech_meeting
		FROM orders o
		LEFT JOIN users u ON o.user_id = u.id
		LEFT JOIN customer_details cd ON o.id_order = cd.order_id
		LEFT JOIN detail_orders dd ON o.id_order = dd.order_id
		WHERE o.id_order = $1
		LIMIT 1
	`

	if err := rp.db.WithContext(ctx).Raw(query, orderId).Scan(&result).Error; err != nil {
		return nil, err
	}

	// Mapping manual
	result.Order.User = result.User
	result.Order.CustomerDetail = result.CustomerDetail
	result.Order.DetailOrder = result.DetailOrder

	return &result.Order, nil
}

func (rp *orderPGRepository) ConfirmPayment(ctx context.Context, orderID, paymentStatus string) error {
	var data model.Order
	if err := rp.db.WithContext(ctx).Model(data).Where("id_order = ?", orderID).Update("payment_status", paymentStatus).Error; err != nil {
		return err
	}
	return nil
}

func (rp *orderPGRepository) UploadFileToCloud(ctx context.Context, file multipart.File, fileName, baseURL, secretID, secretKey string) (string, error) {
	bucketURL, _ := url.Parse(baseURL)

	b := &cos.BaseURL{
		BucketURL: bucketURL,
	}

	client := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  secretID,
			SecretKey: secretKey,
		},
	})

	buf := new(bytes.Buffer)
	_, err := io.Copy(buf, file)
	if err != nil {
		return "", err
	}

	objectKey := "dinarmakeup/" + fileName
	_, err = client.Object.Put(ctx, objectKey, buf, nil)
	if err != nil {
		log.Printf("Error uploading file to Tencent Cloud: %v", err)
		return "", err
	}

	fileURL := fmt.Sprintf("%s/%s", bucketURL.String(), objectKey)

	return fileURL, nil
}

func (rp *orderPGRepository) InsertDocument(ctx context.Context, entity *model.DocumentOrder) (*model.DocumentOrder, error) {
	if err := rp.db.WithContext(ctx).Create(&entity).Error; err != nil {
		return nil, err
	}

	return entity, nil
}

func (rp *orderPGRepository) GetAllTransactionByUserID(ctx context.Context, userID string) ([]*model.Order, error) {
	var orders []*model.Order

	err := rp.db.WithContext(ctx).
		Preload("User").
		Preload("Product").
		Preload("CustomerDetail").
		Preload("DetailOrder").
		Where("user_id = ?", userID).
		Order("created_at DESC").
		Find(&orders).Error

	if err != nil {
		return nil, err
	}

	return orders, nil
}
