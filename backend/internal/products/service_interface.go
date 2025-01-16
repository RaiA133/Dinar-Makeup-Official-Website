package products

import (
	"context"

	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
)

type ProductService interface {
	CreateProduct(ctx context.Context, entity *model.Product) (*dto.CreateProductResponse, error)
	GetProducts(ctx context.Context) ([]dto.GetGetProductsResponse, error)
}
