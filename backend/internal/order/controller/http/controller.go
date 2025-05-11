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
		// TODO : ONLY ADMIN CAN ACCESS

		paginate := pagination.RequestPagination(c)
		data, total, err := oc.service.GetOrders(c, paginate.Offset, paginate.Limit)
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
