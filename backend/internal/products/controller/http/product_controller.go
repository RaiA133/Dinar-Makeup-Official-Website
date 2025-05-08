package http

import (
	"context"
	"errors"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sirupsen/logrus"
	"net/http"
	"path"
	"strings"
)

type ControllerConfig struct {
	Config         *config.Config
	Logger         *logrus.Logger
	ProductService products.ProductService
}

type productController struct {
	cfg     *config.Config
	logger  *logrus.Logger
	service products.ProductService
}

func NewProductController(config *ControllerConfig) products.ProductController {
	return &productController{
		cfg:     config.Config,
		logger:  config.Logger,
		service: config.ProductService,
	}
}

func (pc *productController) CreateProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, pc.logger, errors.New("ACCESS DENIED!"))
			ctx.JSON(httpErrors.ErrorResponse(ctx, errors.New("ACCESS DENIED!")))
			return
		}
		request := new(dto.CreateProductRequest)
		if err := utils.ReadRequest(ctx, request, binding.JSON); err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		productResp, err := pc.service.CreateProduct(context.Background(), request)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		ctx.JSON(http.StatusCreated, dto.ApiProductResponse{
			Status:  http.StatusCreated,
			Message: "Created",
			Data:    productResp,
		})
	}
}

func (pc *productController) GetProducts() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		products, err := pc.service.GetProducts(context.Background())
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		ctx.JSON(http.StatusOK, dto.ApiProductResponse{
			Status:  http.StatusOK,
			Message: "Success",
			Data:    products,
		})
	}
}

func (pc *productController) GetProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id := ctx.Param("id")
		parseUUID, err := utils.ParseUUID(id)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		product, err := pc.service.GetProduct(context.Background(), parseUUID)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		ctx.JSON(http.StatusOK, dto.ApiProductResponse{
			Status:  http.StatusOK,
			Message: "Success",
			Data:    product,
		})
	}
}

func (pc *productController) UpdateProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, pc.logger, errors.New("ACCESS DENIED!"))
			ctx.JSON(httpErrors.ErrorResponse(ctx, errors.New("ACCESS DENIED!")))
			return
		}
		id := ctx.Param("id")
		parseUUID, err := utils.ParseUUID(id)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		request := new(dto.UpdateProductRequest)
		if err := utils.ReadRequest(ctx, request, binding.JSON); err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		entitiyProduct := &model.Product{
			Id:          parseUUID,
			Name:        request.Name,
			Price:       request.Price,
			Description: request.Description,
		}

		updatedProduct, err := pc.service.UpdateProduct(context.Background(), entitiyProduct)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		ctx.JSON(http.StatusOK, dto.ApiProductResponse{
			Status:  http.StatusOK,
			Message: "Updated",
			Data: gin.H{
				"id": updatedProduct.Id,
			},
		})
	}
}

func (pc *productController) AddImageToProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, pc.logger, errors.New("ACCESS DENIED!"))
			ctx.JSON(httpErrors.ErrorResponse(ctx, errors.New("ACCESS DENIED!")))
			return
		}
		productIdStr := ctx.Param("productId")
		productId, err := utils.ParseUUID(productIdStr)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		file, fileHeader, err := ctx.Request.FormFile("file")
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		ext := path.Ext(fileHeader.Filename)
		fileName := strings.TrimSuffix(fileHeader.Filename, ext)

		err = pc.service.AddImageToProduct(context.Background(), productId, file, fileName)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		ctx.JSON(http.StatusOK, dto.ApiProductResponse{
			Status:  http.StatusOK,
			Message: "Image added successfully",
		})
	}
}
