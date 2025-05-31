package http

import (
	"context"
	"errors"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors/response"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	validation "github.com/RianIhsan/wedding-organizer-be/pkg/validator"
	"github.com/gin-gonic/gin"
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
			utils.LogErrorResponse(ctx, pc.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		request := new(dto.CreateProductRequest)
		if err := ctx.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "Invalid payload")
			return
		}
		if err := validation.ValidateStruct(request); err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, err.Error())
			return
		}
		data, err := pc.service.CreateProduct(context.Background(), request)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, err.Error())
			return
		}
		response.SendSuccesResponse(ctx, http.StatusOK, "Product Successfully created", data)
	}
}

func (pc *productController) GetProducts() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		products, err := pc.service.GetProducts(ctx)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(ctx, http.StatusOK, "Success Get All Products", products)
	}
}

func (pc *productController) GetProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id := ctx.Param("id")
		parseUUID, err := utils.ParseUUID(id)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "failed parsing uuid")
			return
		}
		product, err := pc.service.GetProduct(ctx, parseUUID)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(ctx, http.StatusOK, "Success Get Product", product)
	}
}

func (pc *productController) UpdateProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, pc.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		id := ctx.Param("id")
		parseUUID, err := utils.ParseUUID(id)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "failed parsing uuid")
			return
		}

		request := new(dto.UpdateProductRequest)
		if err := ctx.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "Invalid payload")
			return
		}

		entitiyProduct := &model.Product{
			Id:          parseUUID,
			Name:        request.Name,
			Price:       request.Price,
			Description: request.Description,
		}

		data, err := pc.service.UpdateProduct(context.Background(), entitiyProduct)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(ctx, http.StatusOK, "Success Update Product", data)
	}
}

func (pc *productController) AddImageToProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, pc.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		productIdStr := ctx.Param("productId")
		productId, err := utils.ParseUUID(productIdStr)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "failed parsing uuid")
			return
		}

		file, fileHeader, err := ctx.Request.FormFile("file")
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "failed request form file")
			return
		}

		ext := path.Ext(fileHeader.Filename)
		fileName := strings.TrimSuffix(fileHeader.Filename, ext)

		err = pc.service.AddImageToProduct(context.Background(), productId, file, fileName)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, "failed add image to product")
			return
		}

		response.SendSuccesResponse(ctx, http.StatusOK, "Success add image to product", nil)
	}
}

func (pc *productController) DeleteImageFromProduct() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, pc.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		imageId := ctx.Param("imageId")
		err := pc.service.DeleteProductImage(context.Background(), imageId)
		if err != nil {
			utils.LogErrorResponse(ctx, pc.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(ctx, http.StatusOK, "Success delete image from product", nil)
	}
}
