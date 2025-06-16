package repository

import (
	"context"
	"github.com/google/uuid"
	"time"

	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"gorm.io/gorm"
)

type productPostgresRepository struct {
	db *gorm.DB
}

func NewProductPostgresRepository(db *gorm.DB) products.ProductPostgresRepository {
	return &productPostgresRepository{db: db}
}

func (p *productPostgresRepository) Create(ctx context.Context, product *model.Product) (uuid.UUID, error) {
	if err := p.db.WithContext(ctx).Create(product).Error; err != nil {
		return uuid.Nil, err
	}
	return product.Id, nil
}

func (r *productPostgresRepository) CreateGroup(ctx context.Context, group *model.ProductDetailGroup) error {
	if err := r.db.WithContext(ctx).Create(group).Error; err != nil {
		return err
	}
	return nil
}

func (r *productPostgresRepository) CreateGroupItems(ctx context.Context, item *model.ProductDetailItem) error {

	if err := r.db.WithContext(ctx).Create(item).Error; err != nil {
		return err
	}
	return nil
}

func (r *productPostgresRepository) UpdateProduct(ctx context.Context, product *model.Product) error {
	tx := r.db.WithContext(ctx).Begin()

	if err := tx.Model(&model.Product{}).
		Where("id = ?", product.Id).
		Updates(map[string]interface{}{
			"name":        product.Name,
			"price":       product.Price,
			"currency":    product.Currency,
			"description": product.Description,
			"notes":       product.Notes,
		}).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Where("product_id = ?", product.Id).Delete(&model.ProductDetailItem{}).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Where("product_id = ?", product.Id).Delete(&model.ProductDetailGroup{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	for _, group := range product.DetailGroups {
		group.ProductId = product.Id
		group.Id = uuid.New()

		if err := tx.Create(&group).Error; err != nil {
			tx.Rollback()
			return err
		}

		for _, item := range group.DetailItems {
			item.GroupId = group.Id
			item.Id = uuid.New()
			if err := tx.Create(&item).Error; err != nil {
				tx.Rollback()
				return err
			}
		}
	}

	tx.Commit()
	return nil
}

func (p *productPostgresRepository) FindById(ctx context.Context, entity *model.Product) (*model.Product, error) {
	product := new(model.Product)

	if err := p.db.WithContext(ctx).
		Preload("Images").
		Preload("DetailGroups").
		Preload("DetailGroups.DetailItems").
		Where("id = ? AND deleted_at IS NULL", entity.Id).
		First(product).Error; err != nil {
		return nil, err
	}

	return product, nil
}

func (p *productPostgresRepository) FindAll(ctx context.Context) ([]model.Product, error) {
	var products []model.Product
	if err := p.db.WithContext(ctx).Preload("Images").Preload("DetailGroups").Where("deleted_at IS NULL").Find(&products).Error; err != nil {
		return nil, err
	}
	return products, nil
}

func (p *productPostgresRepository) Delete(ctx context.Context, entity *model.Product) error {
	db := p.db.WithContext(ctx)
	// Set the DeletedAt field to the current time to mark it as deleted
	entity.DeletedAt = timePtr(time.Now().Unix())

	if err := db.Model(&model.Product{}).Where("id = ?", entity.Id).Update("deleted_at", entity.DeletedAt).Error; err != nil {
		return err
	}
	return nil
}

func (p *productPostgresRepository) CreateProductImage(ctx context.Context, data *model.ProductImage) error {
	if err := p.db.WithContext(ctx).Create(data).Error; err != nil {
		return err
	}
	return nil
}

func (p *productPostgresRepository) DeleteProductImage(ctx context.Context, id uuid.UUID) error {
	if err := p.db.WithContext(ctx).Where("id = ?", id).Delete(&model.ProductImage{}).Error; err != nil {
		return err
	}
	return nil
}

func (p *productPostgresRepository) GetProductImageById(ctx context.Context, id uuid.UUID) (*model.ProductImage, error) {
	var productImage model.ProductImage
	if err := p.db.WithContext(ctx).Where("id = ?", id).First(&productImage).Error; err != nil {
		return nil, err
	}
	return &productImage, nil
}

// Helper function to return a pointer to an int64
func timePtr(t int64) *int64 {
	return &t
}
