package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/gin-gonic/gin"
)

func MapProductRoutes(productGroup *gin.RouterGroup, controller products.ProductController) {
	productGroup.POST("/products", controller.CreateProduct())
	productGroup.GET("/products", controller.GetProducts())
	productGroup.GET("/products/:id", controller.GetProduct())
}
