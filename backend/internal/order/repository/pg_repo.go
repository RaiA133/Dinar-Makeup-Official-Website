package repository

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
	"gorm.io/gorm"
)

type orderPGRepository struct {
	db *gorm.DB
}

func NewOrderPGRepository(db *gorm.DB) order.RepositoryInterface {
	return &orderPGRepository{
		db: db,
	}
}

func (rp *orderPGRepository) InsertOrder(ctx context.Context, data *model.Order) (*model.Order, error) {
	if err := rp.db.WithContext(ctx).Create(data).Error; err != nil {
		return nil, err
	}
	return data, nil
}

func (rp *orderPGRepository) FindOrdersData(ctx context.Context, offset, limit int) ([]*model.Order, int64, error) {
	var orders []*model.Order
	var total int64

	DB := rp.db.WithContext(ctx)

	if err := DB.Model(&model.Order{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := DB.Offset(offset).Limit(limit).Preload("User").Preload("Product").Find(&orders).Error; err != nil {
		return nil, 0, err
	}

	return orders, total, nil
}
