package gallery

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery/model"
)

type GalleryPostgresInterface interface {
	Create(ctx context.Context, entity *model.Gallery) (*model.Gallery, error)
	FindAll(ctx context.Context) ([]model.Gallery, error)
	FindByID(ctx context.Context, entity *model.Gallery) (*model.Gallery, error)
}
