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
	authGroup.POST("/login/google", controller.LoginGoogle())
}

func MapUserRoutes(userGroup *gin.RouterGroup, controller user.UserController, mw *middleware.MiddlewareManager) {
	userGroup.Use(mw.AuthJwtMiddleware())
	userGroup.GET("/me", controller.GetCurrentUser())
	userGroup.GET("/user/:id", controller.GetUserById())
	userGroup.PUT("/user", controller.UpdateUser())
	userGroup.DELETE("/user/:id", controller.DeleteUser())
	userGroup.GET("/user", controller.GetUsers())
	userGroup.PUT("/user/avatar", controller.UpdateAvatar())
}
