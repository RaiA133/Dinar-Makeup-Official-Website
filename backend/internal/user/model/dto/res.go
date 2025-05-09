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
	Role        string    `json:"role"`
	PhoneNumber string    `json:"phone_number"`
	Address     string    `json:"address"`
	NIK         string    `json:"nik"`
	DateOfBirth string    `json:"date_of_birth"`
	Age         string    `json:"age"`
	CreatedAt   int64     `json:"created_at"`
	UpdatedAt   int64     `json:"updated_at"`
}

type GetUsersResponse struct {
	Id          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	PhoneNumber string    `json:"phone_number"`
	Address     string    `json:"address"`
	Age         string    `json:"age"`
}
