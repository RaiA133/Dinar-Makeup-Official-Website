package user

import (
	"context"
	"mime/multipart"

	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
)

type AuthService interface {
	Register(ctx context.Context, user *model.User) (*dto.UserResponse, error)
	Login(ctx context.Context, user *model.User) (*dto.JwtToken, error)
	LoginWithGoogle(ctx context.Context, idToken string) (*dto.JwtToken, error)
}

type UserService interface {
	GetCurrentUser(ctx context.Context, id string) (*dto.UserResponse, error)
	Update(ctx context.Context, user *model.User, id string) (*dto.UserResponse, error)
	// UpdateAvatar(ctx context.Context, user *model.User) (*dto.UserResponse, error)
	Delete(ctx context.Context, user *model.User) (string, error)
	GetUsers(ctx context.Context, offset, limit int) ([]*dto.GetUsersResponse, int, error)
	UpdateAvatar(ctx context.Context, userId string, file multipart.File, fileName string) error
}
