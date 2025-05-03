package http

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery"
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sirupsen/logrus"
	"net/http"
)

type GalleryControllerConfig struct {
	Config         *config.Config
	Logger         *logrus.Logger
	GalleryService gallery.GalleryServiceInterface
}

type galleryController struct {
	cfg     *config.Config
	logger  *logrus.Logger
	service gallery.GalleryServiceInterface
}

func NewProductController(config *GalleryControllerConfig) gallery.GalleryInterface {
	return &galleryController{
		cfg:     config.Config,
		logger:  config.Logger,
		service: config.GalleryService,
	}
}

func (gc *galleryController) CreateGallery() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		request := new(dto.CreateGalleryRequest)
		if err := utils.ReadRequest(ctx, request, binding.Form); err != nil {
			utils.LogErrorResponse(ctx, gc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		galleryResponse, err := gc.service.CreateGallery(context.Background(), request)
		if err != nil {
			utils.LogErrorResponse(ctx, gc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		ctx.JSON(http.StatusCreated, dto.ApiGalleryResponse{
			Status:  http.StatusCreated,
			Message: "success",
			Data:    galleryResponse,
		})
	}
}
