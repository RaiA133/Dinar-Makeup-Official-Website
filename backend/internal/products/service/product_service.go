package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/cloudinary"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	cloudinary2 "github.com/cloudinary/cloudinary-go/v2"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"mime/multipart"
	"time"
)

type ServiceConfig struct {
	PgRepo           products.ProductPostgresRepository
	Config           *config.Config
	Logger           *logrus.Logger
	CloudinaryClient *cloudinary2.Cloudinary
	CloudinaryConfig *config.CloudinaryConfig
}

type productService struct {
	pgRepo products.ProductPostgresRepository
	cld    *cloudinary2.Cloudinary
	cfg    *config.CloudinaryConfig
}

func NewProductService(config *ServiceConfig, cld *cloudinary2.Cloudinary, cfg *config.CloudinaryConfig) products.ProductService {
	return &productService{
		pgRepo: config.PgRepo,
		cld:    cld,
		cfg:    cfg,
	}
}

func (p *productService) CreateProduct(ctx context.Context, req *dto.CreateProductRequest) (*dto.CreateProductResponse, error) {
	product := &model.Product{
		Name:        req.Name,
		Price:       req.Price,
		Currency:    req.Currency,
		Description: req.Description,
		Notes:       req.Notes,
	}

	// Create product
	if err := p.pgRepo.Create(ctx, product); err != nil {
		return nil, err
	}

	// Loop and create product groups
	for _, g := range req.DetailGroups {
		group := &model.ProductDetailGroup{
			ProductId: product.Id,
			GroupName: g.GroupName,
		}

		if err := p.pgRepo.CreateGroup(ctx, group); err != nil {
			return nil, err
		}

		// Loop and create group items
		for _, i := range g.DetailItems {
			item := &model.ProductDetailItem{
				GroupId:     group.Id,
				Description: i.Description,
			}
			if err := p.pgRepo.CreateGroupItems(ctx, item); err != nil {
				return nil, err
			}
		}
	}
	return &dto.CreateProductResponse{
		Id:    product.Id,
		Name:  product.Name,
		Price: product.Price,
	}, nil
}

func (p *productService) GetProducts(ctx context.Context) ([]dto.GetProductsResponse, error) {
	getProduct, err := p.pgRepo.FindAll(ctx)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.GetProducts.FindAll"))
	}
	var products []dto.GetProductsResponse
	for _, product := range getProduct {
		var detailGroups []dto.MappingProductDetailGroupResponse
		for _, dg := range product.DetailGroups {
			detailGroups = append(detailGroups, dto.MappingProductDetailGroupResponse{
				Name: dg.GroupName,
			})
		}

		banner := ""
		if len(product.Images) > 0 {
			banner = product.Images[0].ImageURL
		}

		products = append(products, dto.GetProductsResponse{
			Id:           product.Id,
			Name:         product.Name,
			Price:        product.Price,
			Banner:       banner,
			DetailGroups: detailGroups,
		})

	}
	return products, nil
}

func (p *productService) GetProduct(ctx context.Context, id uuid.UUID) (*dto.GetProductResponse, error) {
	getProduct, err := p.pgRepo.FindById(ctx, &model.Product{Id: id})
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.GetProduct.FindById"))
	}
	// Mapping response ke struct DTO
	response := dto.GetProductResponse{
		Id:           getProduct.Id,
		Name:         getProduct.Name,
		Price:        getProduct.Price,
		Currency:     getProduct.Currency,
		Description:  getProduct.Description,
		Notes:        getProduct.Notes,
		CreatedAt:    formatIndonesianDateFromMillis(getProduct.CreatedAt),
		UpdatedAt:    formatIndonesianDateFromMillis(getProduct.UpdatedAt),
		Images:       dto.MapProductImages(getProduct.Images),
		DetailGroups: dto.MapProductDetailGroups(getProduct.DetailGroups),
	}

	return &response, nil
}

func (p *productService) UpdateProduct(ctx context.Context, entity *model.Product) (*dto.UpdateProductResponse, error) {
	getId, err := p.pgRepo.FindById(ctx, entity)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.UpdateProduct.FindById"))
	}

	if getId.Name != "" {
		getId.Name = entity.Name
	}
	if getId.Price != 0 {
		getId.Price = entity.Price
	}
	if getId.Description != "" {
		getId.Description = entity.Description
	}

	updatedProduct, err := p.pgRepo.Update(ctx, getId)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.UpdateProduct.Update"))
	}

	response := dto.UpdateProductResponse{
		Id: updatedProduct.Id,
	}
	return &response, nil
}

func (p *productService) AddImageToProduct(ctx context.Context, productId uuid.UUID, file multipart.File, fileName string) error {

	imageURL, err := cloudinary.UploadImage(p.cld, p.cfg, file, fileName)
	if err != nil {
		return httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.AddImageToProduct.UploadImage"))
	}
	err = p.pgRepo.CreateProductImage(ctx, &model.ProductImage{
		ProductId: productId,
		ImageURL:  imageURL,
	})
	if err != nil {
		return httpErrors.NewInternalServerError(errors.Wrap(err, "ProductService.AddImageToProduct.CreateProductImage"))
	}
	return nil
}

func formatIndonesianDateFromMillis(millis int64) string {
	t := time.UnixMilli(millis)
	return t.Format("02-01-2006 15:04:05")
}
