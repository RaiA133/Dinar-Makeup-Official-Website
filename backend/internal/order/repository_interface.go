package order

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
)

type RepositoryInterface interface {
	InsertOrder(ctx context.Context, data *model.Order) (*model.Order, error)
	FindOrdersData(ctx context.Context, offset, limit int) ([]*model.Order, int64, error)
}
