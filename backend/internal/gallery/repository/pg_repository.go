package repository

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery/model"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type galleryPostgresRepository struct {
	db *gorm.DB
}

func NewGalleryPostgresRepository(db *gorm.DB) gallery.GalleryPostgresInterface {
	return &galleryPostgresRepository{
		db: db,
	}
}

func (g *galleryPostgresRepository) Create(ctx context.Context, entity *model.Gallery) (*model.Gallery, error) {
	db := g.db.WithContext(ctx)
	if err := db.Create(entity).Error; err != nil {
		return nil, errors.Wrap(err, "GalleryPostgresRepository.Create")
	}
	return entity, nil
}

func (g *galleryPostgresRepository) FindAll(ctx context.Context) ([]model.Gallery, error) {
	var galleries []model.Gallery
	if err := g.db.WithContext(ctx).Find(&galleries).Error; err != nil {
		return nil, errors.Wrap(err, "GalleryPostgresRepository.FindAll.Find")
	}
	return galleries, nil
}

func (p *galleryPostgresRepository) FindByID(ctx context.Context, entity *model.Gallery) (*model.Gallery, error) {
	data := new(model.Gallery)
	if err := p.db.WithContext(ctx).Where("id = ?", entity.Id).Take(data).Error; err != nil {
		return nil, errors.Wrap(err, "ProductPostgresRepository.FindById.Take")
	}
	return data, nil
}
