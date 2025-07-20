package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/ai"
	"github.com/gin-gonic/gin"
)

func MapAIRoutes(router *gin.RouterGroup, handler ai.ControllerInterface) {
	router.POST("/ai", handler.Insert())
	router.GET("/ai/:id", handler.Find())
	router.GET("/ai", handler.FindAll())
	router.DELETE("/ai", handler.Delete())
}
