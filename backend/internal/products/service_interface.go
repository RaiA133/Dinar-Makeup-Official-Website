package products

import (
	"context"

	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/google/uuid"
)

type ProductService interface {
	CreateProduct(ctx context.Context, entity *model.Product) (*dto.CreateProductResponse, error)
	GetProducts(ctx context.Context) ([]dto.GetGetProductsResponse, error)
	GetProduct(ctx context.Context, id uuid.UUID) (*dto.GetGetProductsResponse, error)
	UpdateProduct(ctx context.Context, entity *model.Product) (*dto.UpdateProductResponse, error)
}
