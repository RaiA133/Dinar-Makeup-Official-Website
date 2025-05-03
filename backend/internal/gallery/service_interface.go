package gallery

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery/model/dto"
)

type GalleryServiceInterface interface {
	CreateGallery(ctx context.Context, request *dto.CreateGalleryRequest) (*dto.CreateGalleryResponse, error)
}
