package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/converter"
	oauth "github.com/RianIhsan/wedding-organizer-be/pkg/outh"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/pkg/errors"
	"gorm.io/gorm"
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

func (a *authService) LoginWithGoogle(ctx context.Context, idToken string) (*dto.JwtToken, error) {
	payload, err := oauth.VerifyGoogleIDToken(ctx, idToken, a.cfg.Google.ClientID)
	if err != nil {
		return nil, errors.New("Failed to verify ID Token")
	}
	isOauth := false
	email, _ := payload["email"].(string)
	name, _ := payload["name"].(string)
	avatar, _ := payload["picture"].(string)
	googleID, _ := payload["sub"].(string)
	if googleID != "" {
		isOauth = true
	}

	user := &model.User{Email: email}
	foundUser, err := a.pgRepo.FindByEmail(ctx, user)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Buat user baru
			user.Name = name
			user.Avatar = avatar
			user.Username = email
			user.Role = "user"
			user.GoogleID = googleID
			user.LoginProvider = "google"
			user.IsOAuth = isOauth
			user.VerifiedEmail = payload["email_verified"].(bool)
			if err := user.PrepareCreate(); err != nil {
				return nil, errors.New("failed to prepare user")
			}
			foundUser, err = a.pgRepo.Create(ctx, user)
			if err != nil {
				return nil, errors.New("failed to create user")
			}
		} else {
			return nil, errors.New("failed to find user")
		}
	}
	accessToken, refreshToken, err := utils.GenerateTokenPair(foundUser, a.cfg)
	if err != nil {
		return nil, errors.New("failed to generate token")
	}

	return &dto.JwtToken{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
