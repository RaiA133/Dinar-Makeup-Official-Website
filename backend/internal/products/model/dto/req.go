package dto

import "github.com/google/uuid"

type CreateProductRequest struct {
	Name        string `json:"name"`
	Price       int64  `json:"price"`
	Description string `json:"description"`
}
// Paket Wedding: Gold. Silver, bronze, Platinum
// Category : in door & out door
// Additional Product : Makeup, dll
// Product Make-Up: Mc, Fotograper

type UpdateProductRequest struct {
	Id          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Price       int64     `json:"price"`
	Description string    `json:"description"`
}
