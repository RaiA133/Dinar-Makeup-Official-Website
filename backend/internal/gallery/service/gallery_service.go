package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

type GalleryServiceConfig struct {
	PgRepo gallery.GalleryPostgresInterface
	Config *config.Config
	Logger *logrus.Logger
}

type galleryService struct {
	pgRepo gallery.GalleryPostgresInterface
}

func NewGalleryService(config *GalleryServiceConfig) gallery.GalleryServiceInterface {
	return &galleryService{
		pgRepo: config.PgRepo,
	}
}

func (gs *galleryService) CreateGallery(ctx context.Context, request *dto.CreateGalleryRequest) (*dto.CreateGalleryResponse, error) {
	data, err := gs.pgRepo.Create(ctx, &model.Gallery{
		Title:       request.Title,
		Caption:     request.Caption,
		Description: request.Description,
	})

	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "GalleryService.CreateGallery.Create"))
	}

	response := dto.CreateGalleryResponse{
		Id:          data.Id,
		Title:       data.Title,
		Caption:     data.Caption,
		Description: data.Description,
		ImageURL:    data.ImageURL,
	}

	return &response, nil
}
