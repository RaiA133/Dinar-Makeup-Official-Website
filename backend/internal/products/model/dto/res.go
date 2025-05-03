package dto

import (
	"time"

	"github.com/google/uuid"
)

type CreateProductResponse struct {
	Id    uuid.UUID `json:"id"`
	Name  string    `json:"name"`
	Price int64     `json:"price"`
}

type GetGetProductsResponse struct {
	Id    uuid.UUID `json:"id"`
	Name  string    `json:"name"`
	Price int64     `json:"price"`
}

type GetProductResponse struct {
	Id          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Price       int64     `json:"price"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ApiProductResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}



type UpdateProductResponse struct {
	Id          uuid.UUID `json:"id"`
}
