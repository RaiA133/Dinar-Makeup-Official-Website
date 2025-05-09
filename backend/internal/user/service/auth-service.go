package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/converter"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/pkg/errors"
)

type authService struct {
	cfg    *config.Config
	pgRepo user.UserPostgresRepository
}

func NewAuthService(cfg *ServiceConfig) user.AuthService {
	return &authService{
		cfg:    cfg.Config,
		pgRepo: cfg.UserPostgresRepository,
	}
}

func (a *authService) Register(ctx context.Context, user *model.User) (*dto.UserResponse, error) {
	result, err := a.pgRepo.FindByEmail(ctx, user)
	if result != nil && err == nil {
		return nil, errors.New("Email already exist")
	}

	if err := user.PrepareCreate(); err != nil {
		return nil, errors.New("Failed to prepare create user")
	}

	createdUser, err := a.pgRepo.Create(ctx, user)
	if err != nil {
		return nil, errors.New("Failed to create user")
	}
	return converter.ToUserResponse(createdUser), nil
}

func (a *authService) Login(ctx context.Context, user *model.User) (*dto.JwtToken, error) {
	foundUser, err := a.pgRepo.FindByEmail(ctx, user)
	if err != nil {
		return nil, errors.New("Failed to find user by email")
	}
	if err := user.ComparePassword(foundUser.Password); err != nil {
		return nil, errors.New("Invalid password")
	}
	accessToken, refreshToken, err := utils.GenerateTokenPair(foundUser, a.cfg)
	if err != nil {
		return nil, errors.New("Failed to generate access token")
	}

	return &dto.JwtToken{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
