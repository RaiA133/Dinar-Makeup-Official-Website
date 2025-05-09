package http

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors/response"
	validation "github.com/RianIhsan/wedding-organizer-be/pkg/validator"
	"net/http"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
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
		if err := ctx.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "invalid payload")
			return
		}

		if err := validation.ValidateStruct(request); err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, err.Error())
			return
		}
		// register new user
		entityUser := &model.User{
			Name:     request.Name,
			Username: request.Username,
			Email:    request.Email,
			Password: request.Password,
			Role:     "user",
			Avatar:   "https://res.cloudinary.com/dyominih0/image/upload/v1697817852/default-avatar-icon-of-social-media-user-vector_p8sqa6.jpg",
		}

		_, err := ac.service.Register(context.Background(), entityUser)
		if err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			response.SendErrorResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		response.SendSuccesResponse(ctx, http.StatusOK, "Register successfully", nil)
	}
}

func (ac *authController) LoginNewUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Membaca dan memvalidasi request
		request := new(dto.UserLoginRequest)
		if err := ctx.ShouldBindJSON(request); err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, "invalid payload")
			return
		}

		// Validasi request (jika ada validasi tambahan)
		if err := validation.ValidateStruct(request); err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			response.SendErrorResponse(ctx, http.StatusBadRequest, err.Error())
			return
		}

		// Login
		jwtToken, err := ac.service.Login(context.Background(), &model.User{
			Email:    request.Email,
			Password: request.Password,
		})
		if err != nil {
			utils.LogErrorResponse(ctx, ac.logger, err)
			response.SendErrorResponse(ctx, http.StatusUnauthorized, err.Error())
			return
		}

		// Mengembalikan respons token
		response.SendSuccesResponse(ctx, http.StatusOK, "Login Success", *jwtToken)
	}
}
