package products

import "github.com/gin-gonic/gin"

type ProductController interface {
	CreateProduct() gin.HandlerFunc
	GetProducts() gin.HandlerFunc
	GetProduct() gin.HandlerFunc
	UpdateProduct() gin.HandlerFunc
	DeleteProduct() gin.HandlerFunc

	// AddImageToProduct Insert Image to product
	AddImageToProduct() gin.HandlerFunc
	DeleteImageFromProduct() gin.HandlerFunc
}
