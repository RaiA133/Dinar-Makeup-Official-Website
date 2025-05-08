package repository

import (
	"context"
	"time"

	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type productPostgresRepository struct {
	db *gorm.DB
}

func NewProductPostgresRepository(db *gorm.DB) products.ProductPostgresRepository {
	return &productPostgresRepository{db: db}
}

func (p *productPostgresRepository) Create(ctx context.Context, product *model.Product) error {
	if err := p.db.WithContext(ctx).Create(product).Error; err != nil {
		return errors.Wrap(err, "ProductRepository.Create")
	}
	return nil
}

func (r *productPostgresRepository) CreateGroup(ctx context.Context, group *model.ProductDetailGroup) error {
	if err := r.db.WithContext(ctx).Create(group).Error; err != nil {
		return errors.Wrap(err, "ProductGroupRepository.Create")
	}
	return nil
}

func (r *productPostgresRepository) CreateGroupItems(ctx context.Context, item *model.ProductDetailItem) error {

	if err := r.db.WithContext(ctx).Create(item).Error; err != nil {
		return errors.Wrap(err, "ProductGroupItemRepository.Create")
	}
	return nil
}

func (p *productPostgresRepository) Update(ctx context.Context, entity *model.Product) (*model.Product, error) {
	db := p.db.WithContext(ctx)
	if err := db.Model(model.Product{}).Where("id = ?", entity.Id).Updates(entity).Error; err != nil {
		return nil, errors.Wrap(err, "ProductPostgresRepository.Update.Updates")
	}
	return entity, nil
}

func (p *productPostgresRepository) FindById(ctx context.Context, entity *model.Product) (*model.Product, error) {
	product := new(model.Product)

	if err := p.db.WithContext(ctx).
		Preload("Images").
		Preload("DetailGroups").
		Preload("DetailGroups.DetailItems").
		Where("id = ?", entity.Id).
		First(product).Error; err != nil {
		return nil, errors.Wrap(err, "ProductPostgresRepository.FindById")
	}

	return product, nil
}

func (p *productPostgresRepository) FindAll(ctx context.Context) ([]model.Product, error) {
	var products []model.Product
	if err := p.db.WithContext(ctx).Find(&products).Error; err != nil {
		return nil, errors.Wrap(err, "ProductPostgresRepository.FindAll.Find")
	}
	return products, nil
}

func (p *productPostgresRepository) Delete(ctx context.Context, entity *model.Product) error {
	db := p.db.WithContext(ctx)

	// Set the DeletedAt field to the current time to mark it as deleted
	entity.DeletedAt = timePtr(time.Now().Unix())

	if err := db.Model(&model.Product{}).Where("id = ?", entity.Id).Update("deleted_at", entity.DeletedAt).Error; err != nil {
		return errors.Wrap(err, "ProductPostgresRepository.Delete.Update")
	}
	return nil
}

func (p *productPostgresRepository) CreateProductImage(ctx context.Context, data *model.ProductImage) error {
	if err := p.db.WithContext(ctx).Create(data).Error; err != nil {
		return errors.Wrap(err, "ProductPostgresRepository.CreateProductImage")
	}
	return nil
}

// Helper function to return a pointer to an int64
func timePtr(t int64) *int64 {
	return &t
}
