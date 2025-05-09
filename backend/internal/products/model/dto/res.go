package dto

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/google/uuid"
)

type CreateProductResponse struct {
	Id    uuid.UUID `json:"id"`
	Name  string    `json:"name"`
	Price int64     `json:"price"`
}

type GetProductsResponse struct {
	Id           uuid.UUID                           `json:"id"`
	Name         string                              `json:"name"`
	Price        int64                               `json:"price"`
	Banner       string                              `json:"banner"`
	DetailGroups []MappingProductDetailGroupResponse `json:"detail_groups"`
}

type ApiProductResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type UpdateProductResponse struct {
	Id uuid.UUID `json:"id"`
}

type GetProductResponse struct {
	Id             uuid.UUID                    `json:"id"`
	Name           string                       `json:"name"`
	Price          int64                        `json:"price"`
	Price30Percent int64                        `json:"price_30_percent"`
	Price50Percent int64                        `json:"price_50_percent"`
	Price80Percent int64                        `json:"price_80_percent"`
	Currency       string                       `json:"currency"`
	Description    string                       `json:"description"`
	Notes          string                       `json:"notes"`
	CreatedAt      string                       `json:"created_at"`
	UpdatedAt      string                       `json:"updated_at"`
	DeletedAt      *int64                       `json:"deleted_at"`
	Images         []ProductImageResponse       `json:"images"`
	DetailGroups   []ProductDetailGroupResponse `json:"detail_groups"`
}

type MappingProductDetailGroupResponse struct {
	Name string `json:"name"`
}
type ProductImageResponse struct {
	Id       uuid.UUID `json:"id"`
	ImageURL string    `json:"image_url"`
}

type ProductDetailGroupResponse struct {
	Id          uuid.UUID                   `json:"id"`
	GroupName   string                      `json:"group_name"`
	DetailItems []ProductDetailItemResponse `json:"detail_items"`
}

type ProductDetailItemResponse struct {
	Id          uuid.UUID `json:"id"`
	Description string    `json:"description"`
}

func MapProductImages(images []model.ProductImage) []ProductImageResponse {
	var imageResponses []ProductImageResponse
	for _, img := range images {
		imageResponses = append(imageResponses, ProductImageResponse{
			Id:       img.Id,
			ImageURL: img.ImageURL,
		})
	}
	return imageResponses
}

// Function to map ProductDetailGroups to DTO format
func MapProductDetailGroups(groups []model.ProductDetailGroup) []ProductDetailGroupResponse {
	var groupResponses []ProductDetailGroupResponse
	for _, group := range groups {
		groupResponses = append(groupResponses, ProductDetailGroupResponse{
			Id:          group.Id,
			GroupName:   group.GroupName,
			DetailItems: MapProductDetailItems(group.DetailItems),
		})
	}
	return groupResponses
}

// Function to map ProductDetailItems to DTO format
func MapProductDetailItems(items []model.ProductDetailItem) []ProductDetailItemResponse {
	var itemResponses []ProductDetailItemResponse
	for _, item := range items {
		itemResponses = append(itemResponses, ProductDetailItemResponse{
			Id:          item.Id,
			Description: item.Description,
		})
	}
	return itemResponses
}
