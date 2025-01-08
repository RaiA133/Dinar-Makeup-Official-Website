package http

import (
	"context"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type userController struct {
	cfg     *config.Config
	logger  *logrus.Logger
	service user.UserService
}

func NewUserController(config *ControllerConfig) user.UserController {
	return &userController{
		cfg:     config.Config,
		logger:  config.Logger,
		service: config.UserService,
	}
}

func (u *userController) GetCurrentUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)

		userResponse, err := u.service.GetCurrentUser(context.Background(), auth.Id.String())
		if err != nil {
			utils.LogErrorResponse(ctx, u.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		ctx.JSON(http.StatusOK, &dto.ApiUserResponse{
			Status:  http.StatusOK,
			Message: "OK",
			Data:    userResponse,
		})
	}
}
