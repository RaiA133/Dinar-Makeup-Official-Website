package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/gin-gonic/gin"
)

func MapProductRoutes(router *gin.RouterGroup, controller products.ProductController, mw *middleware.MiddlewareManager) {
	// Public routes (tanpa middleware auth)
	router.GET("/products", controller.GetProducts())
	router.GET("/products/:id", controller.GetProduct())

	// Private routes (dengan middleware auth)
	protected := router.Group("")
	protected.Use(mw.AuthJwtMiddleware())
	protected.POST("/products", controller.CreateProduct())
	protected.PUT("/products/:id", controller.UpdateProduct())
	protected.POST("/products/:productId/images", controller.AddImageToProduct())
}
