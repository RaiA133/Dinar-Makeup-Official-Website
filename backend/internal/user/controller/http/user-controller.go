package http

import (
	"context"
	"errors"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors/response"
	"github.com/RianIhsan/wedding-organizer-be/pkg/pagination"
	"github.com/google/uuid"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/middleware"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
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
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(ctx, http.StatusOK, "Success Get current user by token", userResponse)
	}
}

func (u *userController) UpdateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "user" {
			utils.LogErrorResponse(ctx, u.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		request := new(dto.UserUpdateRequest)
		if err := ctx.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(ctx, u.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, err.Error())
			return
		}

		_, err := u.service.Update(ctx, &model.User{
			Name:        request.Name,
			PhoneNumber: request.Phone,
			Address:     request.Address,
			NIK:         request.NIK,
			DateOfBirth: request.DateOfBirth,
			Age:         request.Age,
		}, auth.Id.String())
		if err != nil {
			utils.LogErrorResponse(ctx, u.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(ctx, http.StatusOK, "Success Update user", nil)

	}
}

func (u *userController) DeleteUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, u.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}

		id := ctx.Param("id")
		uuidParse, _ := uuid.Parse(id)

		message, err := u.service.Delete(ctx, &model.User{Id: uuidParse})
		if err != nil {
			utils.LogErrorResponse(ctx, u.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		response.SendSuccesResponse(ctx, http.StatusOK, message, nil)
	}
}

func (u *userController) GetUsers() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		auth := middleware.GetAuth(ctx)
		if auth.Role != "admin" {
			utils.LogErrorResponse(ctx, u.logger, errors.New("access denied"))
			response.SendErrorResponse(ctx, http.StatusForbidden, "access denied")
			return
		}
		paginate := pagination.RequestPagination(ctx)
		var err error

		data, total, err := u.service.GetUsers(ctx, paginate.Offset, paginate.Limit)
		if err != nil {
			utils.LogErrorResponse(ctx, u.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		paginate.SetTotalRows(total)

		paginationMeta := response.PaginationMeta{
			CurrentPage: paginate.Page,
			Limit:       paginate.Limit,
			TotalPages:  paginate.TotalPages,
		}

		response.SendSuccessResponseWithPagination(ctx, http.StatusOK, "Success get data users", data, paginationMeta)

	}
}
