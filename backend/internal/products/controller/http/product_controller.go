package http

import (
	"context"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sirupsen/logrus"
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
		request := new(dto.CreateProductRequest)
		if err := utils.ReadRequest(ctx, request, binding.JSON); err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		entitiyProduct := &model.Product{
			Name:        request.Name,
			Price:       request.Price,
			Description: request.Description,
		}
		productResp, err := pc.service.CreateProduct(context.Background(), entitiyProduct)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}
		ctx.JSON(http.StatusCreated, dto.ApiProductResponse{
			Status:  http.StatusCreated,
			Message: "Created",
			Data: gin.H{
				"id":    productResp.Id,
				"name":  productResp.Name,
				"price": productResp.Price,
			},
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
