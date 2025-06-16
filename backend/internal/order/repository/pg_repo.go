package repository

import (
	"context"
	"fmt"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
	"github.com/RianIhsan/wedding-organizer-be/pkg/payment"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/pkg/errors"
	"gorm.io/gorm"
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
	if err := rp.db.WithContext(ctx).Create(data).Error; err != nil {
		return nil, err
	}
	return data, nil
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
		Find(&orders).Error; err != nil {
		return nil, 0, err
	}

	return orders, total, nil
}

func (rp *orderPGRepository) CheckTransaction(ctx context.Context, orderId string) (string, error) {
	var paymentStatus string
	fmt.Println("================================")
	fmt.Println("ORDER ID = ", orderId)
	fmt.Println("================================")

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
	var data model.Order
	if err := rp.db.WithContext(ctx).Preload("User").Where("id_order = ?", orderId).First(&data).Error; err != nil {
		return nil, err
	}
	return &data, nil
}

func (rp *orderPGRepository) ConfirmPayment(ctx context.Context, orderID, paymentStatus string) error {
	var data model.Order
	if err := rp.db.WithContext(ctx).Model(data).Where("order_id = ?", orderID).Update("payment_status", paymentStatus).Error; err != nil {
		return err
	}
	return nil
}
