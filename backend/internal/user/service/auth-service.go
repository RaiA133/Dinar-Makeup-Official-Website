package service

import (
	"context"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/converter"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
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
		return nil, httpErrors.NewError(http.StatusConflict, httpErrors.EmailAlreadyExistsMsg, err)
	}

	if err := user.PrepareCreate(); err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "AuthService.Register.PrepareCreate"))
	}

	createdUser, err := a.pgRepo.Create(ctx, user)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "AuthService.Register.Create"))
	}
	return converter.ToUserResponse(createdUser), nil
}


func (a *authService) Login(ctx context.Context, user *model.User) (*dto.JwtToken, error) {
	foundUser, err := a.pgRepo.FindByEmail(ctx, user)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "AuthService.Login.FindByEmail"))
	}
	if err := user.ComparePassword(foundUser.Password); err != nil {
		return nil, httpErrors.NewError(http.StatusBadRequest, httpErrors.InvalidEmailOrPasswordMsg, err)
	}
	accessToken, refreshToken, err := utils.GenerateTokenPair(foundUser, a.cfg)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "AuthService.Login.GenerateTokenPair"))
	}

	return &dto.JwtToken{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

