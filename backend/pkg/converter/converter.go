package converter

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
)

func ToUserResponse(user *model.User) *dto.UserResponse {
	return &dto.UserResponse{
		Id:          user.Id,
		Name:        user.Name,
		Username:    user.Username,
		Email:       user.Email,
		Password:    user.Password,
		Avatar:      user.Avatar,
		PhoneNumber: user.PhoneNumber,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
	}
}
