package products

import (
	"context"
	"mime/multipart"

	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/google/uuid"
)

type ProductService interface {
	CreateProduct(ctx context.Context, entity *dto.CreateProductRequest) (*dto.CreateProductResponse, error)
	GetProducts(ctx context.Context) ([]dto.GetProductsResponse, error)
	GetProduct(ctx context.Context, id uuid.UUID) (*dto.GetProductResponse, error)
	UpdateProduct(ctx context.Context, entity *model.Product) (*dto.UpdateProductResponse, error)

	// Product Image
	AddImageToProduct(ctx context.Context, productId uuid.UUID, file multipart.File, fileName string) error
	DeleteProductImage(ctx context.Context, imageId string) error
}
