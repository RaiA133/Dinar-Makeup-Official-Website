package user

import (
	"context"

	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
)

type AuthService interface {
	Register(ctx context.Context, user *model.User) (*dto.UserResponse, error)
	Login(ctx context.Context, user *model.User) (*dto.JwtToken, error)
}


type UserService interface {
	GetCurrentUser(ctx context.Context, id string) (*dto.UserResponse, error)
	// Update(ctx context.Context, user *model.User) (*dto.UserResponse, error)
	// UpdateAvatar(ctx context.Context, user *model.User) (*dto.UserResponse, error)
}