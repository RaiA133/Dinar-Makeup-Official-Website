package http

import (
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors/response"
	"github.com/RianIhsan/wedding-organizer-be/pkg/pagination"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"net/http"
)

type OrderControllerConfig struct {
	Config       *config.Config
	Logger       *logrus.Logger
	OrderService order.ServiceInterface
}

type orderController struct {
	cfg     *config.Config
	logger  *logrus.Logger
	service order.ServiceInterface
}

func NewOrderController(cfg *OrderControllerConfig) order.ControllerInterface {
	return &orderController{
		cfg:     cfg.Config,
		logger:  cfg.Logger,
		service: cfg.OrderService,
	}
}

func (oc *orderController) BookingWedding() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := middleware.GetAuth(c)
		if auth.Role != "user" {
			utils.LogErrorResponse(c, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(c, http.StatusForbidden, "access denied")
			return
		}

		request := new(dto.CreateBookingWeddingRequest)
		if err := c.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(c, oc.logger, err)
			response.SendErrorResponse(c, http.StatusBadRequest, "Invalid payload")
			return
		}

		data, err := oc.service.CreateOrder(c, auth.Id.String(), request)
		if err != nil {
			utils.LogErrorResponse(c, oc.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(c, http.StatusOK, "success booking wedding", data)
	}
}

func (oc *orderController) GetBookingWedding() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := middleware.GetAuth(c)
		if auth.Role != "admin" {
			utils.LogErrorResponse(c, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(c, http.StatusForbidden, "access denied")
			return
		}

		search := c.Query("search")

		paginate := pagination.RequestPagination(c)
		data, total, err := oc.service.GetOrders(c, paginate.Offset, paginate.Limit, search)
		if err != nil {
			utils.LogErrorResponse(c, oc.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		paginate.SetTotalRows(total)
		paginationMeta := response.PaginationMeta{
			CurrentPage: paginate.Page,
			Limit:       paginate.Limit,
			TotalPages:  paginate.TotalPages,
		}

		response.SendSuccessResponseWithPagination(c, http.StatusOK, "Success Get All Transaction orders", data, paginationMeta)
	}
}

func (oc *orderController) CallbackURL() gin.HandlerFunc {
	return func(c *gin.Context) {
		var notifPayload map[string]any
		if err := c.ShouldBindJSON(&notifPayload); err != nil {
			utils.LogErrorResponse(c, oc.logger, err)
			response.SendErrorResponse(c, http.StatusBadRequest, "Invalid payload")
			return
		}

		err := oc.service.Callback(c, notifPayload)
		if err != nil {
			utils.LogErrorResponse(c, oc.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(c, http.StatusOK, "success callback url", notifPayload)
	}
}

func (oc *orderController) GetOrder() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := middleware.GetAuth(c)
		if auth.Role != "user" && auth.Role != "admin" {
			utils.LogErrorResponse(c, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(c, http.StatusForbidden, "access denied")
			return
		}

		orderId := c.Param("orderId")
		if orderId == "" {
			utils.LogErrorResponse(c, oc.logger, errors.New("order ID is required"))
			response.SendErrorResponse(c, http.StatusBadRequest, "order ID is required")
			return
		}

		data, err := oc.service.GetOrder(c, orderId)
		if err != nil {
			utils.LogErrorResponse(c, oc.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(c, http.StatusOK, "success get order", data)
	}
}

func (oc *orderController) RegisterDocument() gin.HandlerFunc {
	return func(context *gin.Context) {
		orderId := context.PostForm("order_id")
		auth := middleware.GetAuth(context)
		if auth.Role != "user" && auth.Role != "admin" {
			utils.LogErrorResponse(context, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(context, http.StatusForbidden, "access denied")
			return
		}

		fileHeader, err := context.FormFile("file")
		if err != nil {
			utils.LogErrorResponse(context, oc.logger, errors.New("invalid file form"))
			response.SendErrorResponse(context, http.StatusBadRequest, "invalid file form")
			return
		}

		file, err := fileHeader.Open()
		if err != nil {
			utils.LogErrorResponse(context, oc.logger, errors.New("failed to open file"))
			response.SendErrorResponse(context, http.StatusBadRequest, "failed to open file")
			return
		}
		defer file.Close()

		err = oc.service.RegisterDocument(context, orderId, file, fileHeader.Filename)
		if err != nil {
			utils.LogErrorResponse(context, oc.logger, errors.New("insert document failed"))
			response.SendErrorResponse(context, http.StatusBadRequest, "insert document failed")
			return
		}

		response.SendSuccesResponse(context, http.StatusOK, "success upload to cloud", nil)
	}
}

func (oc *orderController) GetOrdersByUserId() gin.HandlerFunc {
	return func(context *gin.Context) {
		auth := middleware.GetAuth(context)
		if auth.Role != "user" && auth.Role != "admin" {
			utils.LogErrorResponse(context, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(context, http.StatusForbidden, "access denied")
			return
		}

		data, err := oc.service.GetTransactionsByUserId(context, auth.Id.String())
		if err != nil {
			utils.LogErrorResponse(context, oc.logger, err)
			response.SendErrorResponse(context, http.StatusBadRequest, "failed get orders by user id")
			return
		}

		response.SendSuccesResponse(context, 200, "success", data)
	}
}

func (oc *orderController) UpdateOrder() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		idTransaction := ctx.Param("id")
		resultIdTransaction, err := uuid.Parse(idTransaction)
		if err != nil {
			utils.LogErrorResponse(ctx, oc.logger, errors.New("error parsing uuid"))
			response.SendErrorResponse(ctx, http.StatusInternalServerError, "error parsing uuid")
			return
		}

		request := new(dto.UpdateBookingWeddingRequest)
		if err := ctx.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(ctx, oc.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "Invalid payload")
			return
		}

		err = oc.service.UpdateTransactionById(ctx, resultIdTransaction, *request)
		if err != nil {
			utils.LogErrorResponse(ctx, oc.logger, errors.New("failed update transaction"))
			response.SendErrorResponse(ctx, http.StatusBadRequest, err.Error())
			return
		}

		response.SendSuccesResponse(ctx, http.StatusOK, "update transaction success", nil)
	}
}

func (oc *orderController) DeleteOrder() gin.HandlerFunc {
	return func(context *gin.Context) {
		auth := middleware.GetAuth(context)
		if auth.Role != "admin" {
			utils.LogErrorResponse(context, oc.logger, errors.New("access denied"))
			response.SendErrorResponse(context, http.StatusForbidden, "access denied")
			return
		}

		id := context.Param("id")
		UuidConvert, err := uuid.Parse(id)
		if err != nil {
			utils.LogErrorResponse(context, oc.logger, errors.New("error parsing uuid"))
			response.SendErrorResponse(context, http.StatusInternalServerError, "error parsing uuid")
			return
		}

		err = oc.service.DeleteITransaction(context, UuidConvert)
		if err != nil {
			utils.LogErrorResponse(context, oc.logger, errors.New("failed delete transaction data"))
			response.SendErrorResponse(context, http.StatusBadRequest, err.Error())
			return
		}

		response.SendSuccesResponse(context, http.StatusOK, "success delete transaction data", nil)
	}
}
