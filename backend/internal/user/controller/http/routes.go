package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/gin-gonic/gin"
)

// MapAuthRoutes is a function routes
func MapAuthRoutes(authGroup *gin.RouterGroup, controller user.AuthController) {
	authGroup.POST("/register", controller.RegisterNewUser())
	authGroup.POST("/login", controller.LoginNewUser())
}

func MapUserRoutes(userGroup *gin.RouterGroup, controller user.UserController, mw *middleware.MiddlewareManager) {
	userGroup.Use(mw.AuthJwtMiddleware())
	userGroup.GET("/me", controller.GetCurrentUser())
}
