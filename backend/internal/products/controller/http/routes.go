package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/gin-gonic/gin"
)

func MapProductRoutes(productGroup *gin.RouterGroup, controller products.ProductController, mw *middleware.MiddlewareManager) {

	productGroup.Use(mw.AuthJwtMiddleware())
	productGroup.POST("/products", controller.CreateProduct())
	productGroup.GET("/products", controller.GetProducts())
	productGroup.GET("/products/:id", controller.GetProduct())
	productGroup.PUT("/products/:id", controller.UpdateProduct())

	productGroup.POST("/products/:productId/images", controller.AddImageToProduct())
}
