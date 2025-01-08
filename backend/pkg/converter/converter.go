package converter

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
)

func ToUserResponse(user *model.User) *dto.UserResponse {
	return &dto.UserResponse{
		Id:          user.Id,
		Email:       user.Email,
		Password:    user.Password,
		Avatar:      user.Avatar,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
	}
}
