package ai

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model"
)

type AiPostgresInterface interface {
	Create(ctx context.Context, entity *model.AIHistory) (*model.AIHistory, error)
	FindAll(ctx context.Context) ([]model.AIHistory, error)
	FindOne(ctx context.Context, id int) (*model.AIHistory, error)
	DeleteAll(ctx context.Context) error
}
