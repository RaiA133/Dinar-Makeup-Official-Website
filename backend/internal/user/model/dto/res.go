package dto

import "github.com/google/uuid"

type ApiUserResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type UserTokenResponse struct {
	Status  int      `json:"status"`
	Message string   `json:"message"`
	Jwt     JwtToken `json:"jwt"`
}

type JwtToken struct {
	AccessToken  string `json:"access_Token"`
	RefreshToken string `json:"refresh_token"`
}

// UserResponse Model DTO response user
type UserResponse struct {
	Id          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Username    string    `json:"username"`
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	Avatar      string    `json:"avatar"`
	PhoneNumber string    `json:"phone_number"`
	CreatedAt   int64     `json:"created_at"`
	UpdatedAt   int64     `json:"updated_at"`
}
