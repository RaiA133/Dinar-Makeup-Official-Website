package dto

import "github.com/google/uuid"

type CreateGalleryResponse struct {
	Id          uuid.UUID `json:"id"`
	Title       string    `json:"title"`
	Caption     string    `json:"caption"`
	Description string    `json:"description"`
	ImageURL    string    `json:"image_url,omitempty"`
}

type ApiGalleryResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}
