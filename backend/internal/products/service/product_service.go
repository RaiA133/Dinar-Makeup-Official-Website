package service

import (
	"context"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

type ServiceConfig struct {
	PgRepo products.ProductPostgresRepository
	Config *config.Config
	Logger *logrus.Logger
}

type productService struct {
	pgRepo products.ProductPostgresRepository
}

func NewProductService(config *ServiceConfig) products.ProductService {
	return &productService{
		pgRepo: config.PgRepo,
	}
}

func (p *productService) CreateProduct(ctx context.Context, entity *model.Product) (*dto.CreateProductResponse, error) {
	createdProduct, err := p.pgRepo.Create(ctx, entity)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.CreateProduct.Create"))
	}
	response := dto.CreateProductResponse{
		Id:    createdProduct.Id,
		Name:  createdProduct.Name,
		Price: createdProduct.Price,
	}
	return &response, nil
}

func (p *productService) GetProducts(ctx context.Context) ([]dto.GetGetProductsResponse, error) {
	getProduct, err := p.pgRepo.FindAll(ctx)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.GetProducts.FindAll"))
	}
	var products []dto.GetGetProductsResponse
	for _, product := range getProduct {
		products = append(products, dto.GetGetProductsResponse{
			Id:    product.Id,
			Name:  product.Name,
			Price: product.Price,
		})

	}
	return products, nil
}
