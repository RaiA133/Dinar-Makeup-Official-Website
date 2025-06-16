package products

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/google/uuid"
)

type ProductPostgresRepository interface {
	Create(ctx context.Context, product *model.Product) (uuid.UUID, error)
	CreateGroup(ctx context.Context, group *model.ProductDetailGroup) error
	CreateGroupItems(ctx context.Context, item *model.ProductDetailItem) error
	UpdateProduct(ctx context.Context, product *model.Product) error
	FindById(ctx context.Context, entity *model.Product) (*model.Product, error)
	FindAll(ctx context.Context) ([]model.Product, error)
	Delete(ctx context.Context, entity *model.Product) error

	// Product Image
	CreateProductImage(ctx context.Context, data *model.ProductImage) error
	DeleteProductImage(ctx context.Context, id uuid.UUID) error
	GetProductImageById(ctx context.Context, id uuid.UUID) (*model.ProductImage, error)
}
