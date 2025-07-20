package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model/req"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model/res"
	"github.com/sirupsen/logrus"
	"time"
)

type AIServiceConfig struct {
	PgRepo ai.AiPostgresInterface
	Config *config.Config
	Logger *logrus.Logger
}

type aiService struct {
	pgRepo ai.AiPostgresInterface
	config *config.Config
	logger *logrus.Logger
}

func NewAIService(cfg *AIServiceConfig) ai.AiServiceInterface {
	return &aiService{
		pgRepo: cfg.PgRepo,
		config: cfg.Config,
		logger: cfg.Logger,
	}
}

func (a aiService) Create(ctx context.Context, dto *req.AiReq) (*req.AiResp, error) {
	_, err := a.pgRepo.Create(ctx, &model.AIHistory{
		UserID:    dto.UserId,
		Sender:    dto.Sender,
		Message:   dto.Message,
		Timestamp: time.Now(),
	})
	if err != nil {
		return nil, err
	}
	response := &req.AiResp{
		Message: "success",
	}
	return response, nil
}

func (a aiService) GetList(ctx context.Context) ([]*res.AiResponse, error) {
	data, err := a.pgRepo.FindAll(ctx)
	if err != nil {
		return nil, err
	}

	var datas []*res.AiResponse
	for _, i := range data {
		datas = append(datas, &res.AiResponse{
			Id:        i.ID,
			UserId:    i.UserID,
			Sender:    i.Sender,
			Message:   i.Message,
			Timestamp: i.Timestamp,
		})
	}

	return datas, nil
}

func (a aiService) Get(ctx context.Context, id int) (*res.AiResponse, error) {
	aiData, err := a.pgRepo.FindOne(ctx, id)
	if err != nil {
		return nil, err
	}

	return &res.AiResponse{
		Id:        aiData.ID,
		UserId:    aiData.UserID,
		Sender:    aiData.Sender,
		Message:   aiData.Message,
		Timestamp: aiData.Timestamp,
	}, nil
}

func (a aiService) DeleteAll(ctx context.Context) error {
	err := a.pgRepo.DeleteAll(ctx)
	if err != nil {
		return err
	}
	return nil
}
