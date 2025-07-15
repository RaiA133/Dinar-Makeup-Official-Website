package repository

import (
	"bytes"
	"context"
	"fmt"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
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

	for _, o := range orders {
		var detail model.DetailOrder
		if err := rp.db.WithContext(ctx).Where("order_id = ?", o.Id).First(&detail).Error; err == nil {
			o.DetailOrder = detail
		}

		var customer model.CustomerDetail
		if err := rp.db.WithContext(ctx).Where("order_id = ?", o.Id).First(&customer).Error; err == nil {
			o.CustomerDetail = customer
		}
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

func (rp *orderPGRepository) GetOrderByID(ctx context.Context, idOrder string) (*model.Order, error) {
	var order model.Order

	// Query order utama beserta user dan product
	err := rp.db.WithContext(ctx).
		Preload("User").
		Preload("Product").
		Where("id = ?", idOrder).
		First(&order).Error
	if err != nil {
		return nil, err
	}

	// Query relasi: CustomerDetail
	var customer model.CustomerDetail
	if err := rp.db.WithContext(ctx).
		Where("order_id = ?", order.Id).
		First(&customer).Error; err == nil {
		order.CustomerDetail = customer
	}

	// Query relasi: DetailOrder
	var detail model.DetailOrder
	if err := rp.db.WithContext(ctx).
		Where("order_id = ?", order.Id).
		First(&detail).Error; err == nil {
		order.DetailOrder = detail
	}

	// Query relasi: DocumentOrders (slice)
	var documents []model.DocumentOrder
	if err := rp.db.WithContext(ctx).
		Where("order_id = ?", order.Id).
		Find(&documents).Error; err == nil {
		order.DocumentOrders = documents
	}

	return &order, nil
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
		Preload("DocumentOrders").
		Where("user_id = ?", userID).
		Order("created_at DESC").
		Find(&orders).Error

	if err != nil {
		return nil, err
	}

	for _, o := range orders {
		var detail model.DetailOrder
		if err := rp.db.WithContext(ctx).Where("order_id = ?", o.Id).First(&detail).Error; err == nil {
			o.DetailOrder = detail
		}

		var customer model.CustomerDetail
		if err := rp.db.WithContext(ctx).Where("order_id = ?", o.Id).First(&customer).Error; err == nil {
			o.CustomerDetail = customer
		}
	}

	return orders, nil
}

func (r *orderPGRepository) GetAllAkadDateWherePaymentSuccess(ctx context.Context) ([]string, error) {
	var akadDates []string

	err := r.db.WithContext(ctx).
		Table("detail_orders").
		Select("detail_orders.akad_date").
		Joins("JOIN orders ON orders.id = detail_orders.order_id").
		Where("orders.payment_status = ?", "SUKSES").
		Scan(&akadDates).Error

	if err != nil {
		return nil, err
	}

	return akadDates, nil
}

func (rp *orderPGRepository) GetOrderByIdOrder(ctx context.Context, idOrder string) (*model.Order, error) {
	var order model.Order

	// Query order utama beserta user dan product
	err := rp.db.WithContext(ctx).
		Preload("User").
		Preload("Product").
		Where("id_order = ?", idOrder).
		First(&order).Error
	if err != nil {
		return nil, err
	}

	return &order, nil
}
