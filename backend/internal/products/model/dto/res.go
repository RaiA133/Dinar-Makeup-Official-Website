package dto

import "github.com/google/uuid"

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
