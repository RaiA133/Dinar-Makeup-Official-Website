package dto

type CreateProductRequest struct {
	Name        string `json:"name"`
	Price       int64  `json:"price"`
	Description string `json:"description"`
}
