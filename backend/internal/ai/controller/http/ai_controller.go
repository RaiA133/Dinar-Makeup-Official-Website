package http

import (
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model/req"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors/response"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
	"strconv"
)

type ControllerConfig struct {
	Config    *config.Config
	Logger    *logrus.Logger
	AiService ai.AiServiceInterface
}

type aiController struct {
	cfg     *config.Config
	logger  *logrus.Logger
	service ai.AiServiceInterface
}

func NewAiController(cfg *ControllerConfig) ai.ControllerInterface {
	return &aiController{
		cfg:     cfg.Config,
		logger:  cfg.Logger,
		service: cfg.AiService,
	}
}

func (a aiController) Insert() gin.HandlerFunc {
	return func(c *gin.Context) {
		request := new(req.AiReq)
		if err := c.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(c, a.logger, err)
			response.SendErrorResponse(c, http.StatusBadRequest, "Invalid payload")
			return
		}

		_, err := a.service.Create(c, request)
		if err != nil {
			utils.LogErrorResponse(c, a.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(c, 200, "success", nil)
	}
}

func (a aiController) Find() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		idInt, err := strconv.Atoi(id)
		if err != nil {
			utils.LogErrorResponse(c, a.logger, err)
			response.SendErrorResponse(c, http.StatusBadRequest, "Invalid id")
			return
		}
		data, err := a.service.Get(c, idInt)
		if err != nil {
			utils.LogErrorResponse(c, a.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(c, 200, "success", data)
	}
}

func (a aiController) FindAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Query("user_id")
		data, err := a.service.GetList(c, id)
		if err != nil {
			utils.LogErrorResponse(c, a.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(c, 200, "success", data)
	}
}

func (a aiController) Delete() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Query("user_id")
		err := a.service.DeleteAll(c, id)
		if err != nil {
			utils.LogErrorResponse(c, a.logger, err)
			response.SendErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(c, 200, "success", nil)
	}
}
