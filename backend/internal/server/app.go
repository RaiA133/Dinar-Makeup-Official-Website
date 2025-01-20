package server

import (
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	userRepository "github.com/RianIhsan/wedding-organizer-be/internal/user/repository"
	userService "github.com/RianIhsan/wedding-organizer-be/internal/user/service"
	userRoute "github.com/RianIhsan/wedding-organizer-be/internal/user/controller/http"
	userController "github.com/RianIhsan/wedding-organizer-be/internal/user/controller/http"
	"github.com/gin-gonic/gin"
	productRepository "github.com/RianIhsan/wedding-organizer-be/internal/products/repository"
	productService "github.com/RianIhsan/wedding-organizer-be/internal/products/service"
	productController "github.com/RianIhsan/wedding-organizer-be/internal/products/controller/http"
	productRoute "github.com/RianIhsan/wedding-organizer-be/internal/products/controller/http"
)

func (s *Server) Bootstrap() error {
	// -----------------------------------------------------------------------------------------------------------
	// create a new instance repositories
	userPostgresRepo := userRepository.NewUserPostgresRepository(s.db)
	userRedisRepo := userRepository.NewUserRedisRepository(s.redisClient)
	productPostgresRepo := productRepository.NewProductPostgresRepository(s.db)
	// -----------------------------------------------------------------------------------------------------------
	// create a new instance services
	authSV := userService.NewAuthService(&userService.ServiceConfig{
		Config:                 s.cfg,
		UserPostgresRepository: userPostgresRepo,
	})
	userSV := userService.NewUserService(&userService.ServiceConfig{
		Config:                 s.cfg,
		Logger:                 s.logger,
		UserPostgresRepository: userPostgresRepo,
		UserRedisRepository:    userRedisRepo,
	})
	productSV := productService.NewProductService(&productService.ServiceConfig{
		PgRepo: productPostgresRepo,
		Config: s.cfg,
		Logger: s.logger,
	})

	

	// -----------------------------------------------------------------------------------------------------------
	// create a new instance controllers
	authController := userController.NewAuthController(&userController.ControllerConfig{
		Config:      s.cfg,
		Logger:      s.logger,
		AuthService: authSV,
	})
	usrController := userController.NewUserController(&userController.ControllerConfig{
		Config:      s.cfg,
		Logger:      s.logger,
		UserService: userSV,
	})
	productController := productController.NewProductController(&productController.ControllerConfig{
		Config:         s.cfg,
		Logger: 	   s.logger,
		ProductService: productSV,
	})


	// -----------------------------------------------------------------------------------------------------------
	// create a new instance middleware
	middlewareManager := middleware.NewMiddlewareManager(&middleware.MiddlewareConfig{
		Logger: s.logger,
		Config: s.cfg,
	})

	s.app.Use(middlewareManager.RequestIdMiddleware())
	s.app.Use(middlewareManager.RequestLoggerMiddleware())

	// -----------------------------------------------------------------------------------------------------------
	// setup routes
	apiV1 := s.app.Group("/api")
	{
		// group user routes
		userGroup := apiV1.Group("/v1")
		{
			userRoute.MapAuthRoutes(userGroup, authController)
			userRoute.MapUserRoutes(userGroup, usrController, middlewareManager)
			
		}
		// group product routes
		productGroup := apiV1.Group("/v1")
		{
			productRoute.MapProductRoutes(productGroup, productController)
		}

	}

	apiV1.GET("/ping", middlewareManager.AuthJwtMiddleware(), func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Pong!!",
			"user_id": auth.Id,
		})
	})

	return nil
}
