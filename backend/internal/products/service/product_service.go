package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/cloudinary"
	cloudinary2 "github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
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

	idProduct, err := p.pgRepo.Create(ctx, product)
	if err != nil {
		return nil, errors.New("failed to create product")
	}

	// Loop and create product groups
	for _, g := range req.DetailGroups {
		group := &model.ProductDetailGroup{
			ProductId: idProduct,
			GroupName: g.GroupName,
		}

		if err := p.pgRepo.CreateGroup(ctx, group); err != nil {
			return nil, errors.New("failed to create product detail group")
		}

		// Loop and create group items
		for _, i := range g.DetailItems {
			item := &model.ProductDetailItem{
				GroupId:     group.Id,
				Description: i.Description,
			}
			if err := p.pgRepo.CreateGroupItems(ctx, item); err != nil {
				return nil, errors.New("failed to create product detail item")
			}
		}
	}
	return &dto.CreateProductResponse{
		Id:    idProduct,
		Name:  product.Name,
		Price: product.Price,
	}, nil
}

func (p *productService) GetProducts(ctx context.Context) ([]dto.GetProductsResponse, error) {
	getProduct, err := p.pgRepo.FindAll(ctx)
	if err != nil {
		return nil, errors.New("failed to get products")
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
			Currency:     product.Currency,
			Banner:       banner,
			DetailGroups: detailGroups,
		})

	}
	return products, nil
}

func (p *productService) GetProduct(ctx context.Context, id uuid.UUID) (*dto.GetProductResponse, error) {
	getProduct, err := p.pgRepo.FindById(ctx, &model.Product{Id: id})
	if err != nil {
		return nil, errors.New("Product not found")
	}

	price := float64(getProduct.Price)
	productWithDp30 := price * 0.30
	productWithDp50 := price * 0.50
	productWithDp80 := price * 0.80
	// Mapping response ke struct DTO
	response := dto.GetProductResponse{
		Id:             getProduct.Id,
		Name:           getProduct.Name,
		Price:          getProduct.Price,
		Price30Percent: int64(productWithDp30),
		Price50Percent: int64(productWithDp50),
		Price80Percent: int64(productWithDp80),
		Currency:       getProduct.Currency,
		Description:    getProduct.Description,
		Notes:          getProduct.Notes,
		CreatedAt:      formatIndonesianDateFromMillis(getProduct.CreatedAt),
		UpdatedAt:      formatIndonesianDateFromMillis(getProduct.UpdatedAt),
		Images:         dto.MapProductImages(getProduct.Images),
		DetailGroups:   dto.MapProductDetailGroups(getProduct.DetailGroups),
	}

	return &response, nil
}

func (p *productService) UpdateProduct(ctx context.Context, req *dto.UpdateProductRequest) (*dto.UpdateProductResponse, error) {
	existingProduct, err := p.pgRepo.FindById(ctx, &model.Product{Id: req.Id})
	if err != nil {
		return nil, errors.New("product not found")
	}

	var detailGroups []model.ProductDetailGroup
	for _, group := range req.DetailGroups {
		var detailItems []model.ProductDetailItem
		for _, item := range group.DetailItems {
			detailItems = append(detailItems, model.ProductDetailItem{
				Description: item.Description,
			})
		}

		detailGroups = append(detailGroups, model.ProductDetailGroup{
			GroupName:   group.GroupName,
			DetailItems: detailItems,
		})
	}

	productToUpdate := model.Product{
		Id:           existingProduct.Id,
		Name:         req.Name,
		Price:        req.Price,
		Currency:     req.Currency,
		Description:  req.Description,
		Notes:        req.Notes,
		DetailGroups: detailGroups,
	}

	err = p.pgRepo.UpdateProduct(ctx, &productToUpdate)
	if err != nil {
		return nil, errors.New("failed to update product")
	}

	// Step 4: Return response
	response := dto.UpdateProductResponse{
		Id: productToUpdate.Id,
	}
	return &response, nil
}

func (p *productService) AddImageToProduct(ctx context.Context, productId uuid.UUID, file multipart.File, fileName string) error {

	dataCloudinary, err := cloudinary.UploadImage(p.cld, p.cfg, file, fileName)
	if err != nil {
		return errors.New("failed to upload image (cloudinary)")
	}
	err = p.pgRepo.CreateProductImage(ctx, &model.ProductImage{
		ProductId: productId,
		ImageURL:  dataCloudinary.ImageURL,
		PublicId:  dataCloudinary.PublicID,
	})
	if err != nil {
		return errors.New("failed to create product image")
	}
	return nil
}

func (p *productService) DeleteProductImage(ctx context.Context, imageId string) error {
	parse, err := uuid.Parse(imageId)
	if err != nil {
		return err
	}

	image, err := p.pgRepo.GetProductImageById(ctx, parse)
	if err != nil {
		return errors.New("product image not found")
	}

	_, err = p.cld.Upload.Destroy(ctx, uploader.DestroyParams{
		PublicID: image.PublicId,
	})

	err = p.pgRepo.DeleteProductImage(ctx, image.Id)
	if err != nil {
		return errors.New("failed to delete product image")
	}
	return nil
}

func (p *productService) DeleteProduct(ctx context.Context, id uuid.UUID) error {
	productId, err := p.pgRepo.FindById(ctx, &model.Product{Id: id})
	if err != nil {
		return errors.New("product not found")
	}

	err = p.pgRepo.Delete(ctx, productId)
	if err != nil {
		return errors.New("failed to delete product")
	}
	return nil
}

func formatIndonesianDateFromMillis(millis int64) string {
	t := time.UnixMilli(millis)
	return t.Format("02-01-2006 15:04:05")
}
