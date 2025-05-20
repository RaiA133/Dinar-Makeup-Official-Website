package server

import (
	"github.com/RianIhsan/wedding-organizer-be/pkg/cloudinary"
	"github.com/RianIhsan/wedding-organizer-be/pkg/payment"
	"github.com/pkg/errors"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	productController "github.com/RianIhsan/wedding-organizer-be/internal/products/controller/http"
	productRoute "github.com/RianIhsan/wedding-organizer-be/internal/products/controller/http"
	productRepository "github.com/RianIhsan/wedding-organizer-be/internal/products/repository"
	productService "github.com/RianIhsan/wedding-organizer-be/internal/products/service"
	userController "github.com/RianIhsan/wedding-organizer-be/internal/user/controller/http"
	userRoute "github.com/RianIhsan/wedding-organizer-be/internal/user/controller/http"
	userRepository "github.com/RianIhsan/wedding-organizer-be/internal/user/repository"
	userService "github.com/RianIhsan/wedding-organizer-be/internal/user/service"

	galleryController "github.com/RianIhsan/wedding-organizer-be/internal/gallery/controller/http"
	galleryRoute "github.com/RianIhsan/wedding-organizer-be/internal/gallery/controller/http"
	galleryRepository "github.com/RianIhsan/wedding-organizer-be/internal/gallery/repository"
	galleryService "github.com/RianIhsan/wedding-organizer-be/internal/gallery/service"

	orderController "github.com/RianIhsan/wedding-organizer-be/internal/order/controller/http"
	orderRoute "github.com/RianIhsan/wedding-organizer-be/internal/order/controller/http"
	orderRepository "github.com/RianIhsan/wedding-organizer-be/internal/order/repository"
	orderService "github.com/RianIhsan/wedding-organizer-be/internal/order/service"
	"github.com/gin-gonic/gin"
)

func (s *Server) Bootstrap() error {
	// -----------------------------------------------------------------------------------------------------------
	// create a new instance repositories
	userPostgresRepo := userRepository.NewUserPostgresRepository(s.db)
	userRedisRepo := userRepository.NewUserRedisRepository(s.redisClient)
	productPostgresRepo := productRepository.NewProductPostgresRepository(s.db)
	galleryPostgresRepo := galleryRepository.NewGalleryPostgresRepository(s.db)
	orderPostgresRepo := orderRepository.NewOrderPGRepository(s.db)
	InitMidtrans := payment.InitMidtransCore(*s.cfg)

	cldConfig, err := cloudinary.InitializeCloudinary(&s.cfg.Cloudinary)
	if err != nil {
		return errors.New("failed initialize cloudinary")
	}
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
	}, cldConfig,
		&s.cfg.Cloudinary,
	)
	productSV := productService.NewProductService(
		&productService.ServiceConfig{
			PgRepo: productPostgresRepo,
			Config: s.cfg,
			Logger: s.logger,
		},
		cldConfig,
		&s.cfg.Cloudinary,
	)

	gallerySV := galleryService.NewGalleryService(&galleryService.GalleryServiceConfig{
		PgRepo: galleryPostgresRepo,
		Config: s.cfg,
		Logger: s.logger,
	})

	orderSV := orderService.NewOrderService(&orderService.ServiceConfig{
		OrderRepo:      orderPostgresRepo,
		UserService:    userSV,
		ProductService: productSV,
		Config:         s.cfg,
		Logger:         s.logger,
	},
		InitMidtrans,
	)

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
		Logger:         s.logger,
		ProductService: productSV,
	})

	galleryController := galleryController.NewProductController(&galleryController.GalleryControllerConfig{
		Config:         s.cfg,
		Logger:         s.logger,
		GalleryService: gallerySV,
	})

	orderController := orderController.NewOrderController(&orderController.OrderControllerConfig{
		Config:       s.cfg,
		Logger:       s.logger,
		OrderService: orderSV,
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
			productRoute.MapProductRoutes(productGroup, productController, middlewareManager)
		}

		// group gallery routes
		galleryGroup := apiV1.Group("/v1")
		{
			galleryRoute.MapGalleryRoutes(galleryGroup, galleryController)
		}

		// group order routes
		orderGroup := apiV1.Group("/v1")
		{
			orderRoute.MapOrderRoutes(orderGroup, orderController, middlewareManager)
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
