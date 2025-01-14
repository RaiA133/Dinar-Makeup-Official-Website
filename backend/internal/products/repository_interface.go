package products

import (
	"context"

	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
)

type ProductPostgresRepository interface {
	Create(ctx context.Context, entity *model.Product) (*model.Product, error)
	Update(ctx context.Context, entity *model.Product) (*model.Product, error)
	FindById(ctx context.Context, entity *model.Product) (*model.Product, error)
	FindAll(ctx context.Context) ([]model.Product, error)
	Delete(ctx context.Context, entity *model.Product) error
}
