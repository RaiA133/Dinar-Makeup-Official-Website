package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/gin-gonic/gin"
)

func MapOrderRoutes(router *gin.RouterGroup, controller order.ControllerInterface, mw *middleware.MiddlewareManager) {
	router.GET("/order", controller.GetBookingWedding())

	protected := router.Group("")
	protected.Use(mw.AuthJwtMiddleware())
	protected.POST("/order", controller.BookingWedding())
}
