package ai

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model/req"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model/res"
)

type AiServiceInterface interface {
	Create(ctx context.Context, dto *req.AiReq) (*req.AiResp, error)
	GetList(ctx context.Context, userId string) ([]*res.AiResponse, error)
	Get(ctx context.Context, id int) (*res.AiResponse, error)
	DeleteAll(ctx context.Context, userId string) error
}
