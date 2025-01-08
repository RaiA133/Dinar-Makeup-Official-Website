package http

import (
	"context"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sirupsen/logrus"
)

type authController struct {
	cfg     *config.Config
	logger  *logrus.Logger
	service user.AuthService
}

// NewAuthController is a factory function
// initializing a authController with its service layer dependencies
func NewAuthController(config *ControllerConfig) user.AuthController {
	return &authController{
		cfg:     config.Config,
		logger:  config.Logger,
		service: config.AuthService,
	}
}

func (ac *authController) RegisterNewUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// read & validate
		request := new(dto.UserRegisterRequest)
		if err := utils.ReadRequest(ctx, request, binding.JSON); err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		// register new user
		entityUser := &model.User{
			Name:     request.Name,
			Username: request.Username,
			Email:    request.Email,
			Password: request.Password,
			Avatar:   "https://res.cloudinary.com/dyominih0/image/upload/v1697817852/default-avatar-icon-of-social-media-user-vector_p8sqa6.jpg",
		}

		userResponse, err := ac.service.Register(context.Background(), entityUser)
		if err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		ctx.JSON(http.StatusCreated, dto.ApiUserResponse{
			Status:  http.StatusCreated,
			Message: "Created",
			
			Data: gin.H{
				"id":    userResponse.Id,
				"email": userResponse.Email,
			},
		})
	}
}

func (ac *authController) LoginNewUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// read and validate request
		request := new(dto.UserLoginRequest)
		if err := utils.ReadRequest(ctx, request, binding.JSON); err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		// login
		jwtToken, err := ac.service.Login(context.Background(), &model.User{
			Email:    request.Email,
			Password: request.Password,
		})
		if err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			ctx.JSON(httpErrors.ErrorResponse(ctx, err))
			return
		}

		// return response token
		ctx.JSON(http.StatusOK, dto.UserTokenResponse{
			Status:  http.StatusOK,
			Message: "OK",
			Jwt:     *jwtToken,
		})
	}
}
