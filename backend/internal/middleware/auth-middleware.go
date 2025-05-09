package middleware

import (
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors/response"
	"github.com/pkg/errors"
	"net/http"
	"strings"

	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
)

type auth struct {
	Id    uuid.UUID
	Email string
	Role  string
}

// AuthJwtMiddleware is a middleware authentication request.
// cara autentikasi JWT menggunakan cookie atau header otorisasi
func (mw *MiddlewareManager) AuthJwtMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader("Authorization")

		mw.logger.WithFields(logrus.Fields{"Authorization": authorizationHeader}).
			Debug("auth middleware authorization header")

		var tokenString string

		// cara authentikasi menggunakan header authorization
		// cek apakah authorization header ada?
		if authorizationHeader != "" {
			headerParts := strings.Split(authorizationHeader, " ") // ['Bearer','token']
			if len(headerParts) < 2 {
				errResponse := errors.New("Authorization header is invalid")
				utils.LogErrorResponse(ctx, mw.logger, errResponse)
				response.SendErrorResponse(ctx, http.StatusUnauthorized, "Unauthorized header")
				ctx.Abort()
				return
			}
			tokenString = headerParts[1]
		} else {
			// cara authentikasi menggunakan cookie, jika tidak ada authorization header
			cookie, err := ctx.Cookie("jwt-token") // setcookie dengan jwt belum diimplemntasikan
			if err != nil {
				errResponse := errors.New("Authorization header is invalid (cookie)")
				utils.LogErrorResponse(ctx, mw.logger, errResponse)
				response.SendErrorResponse(ctx, http.StatusUnauthorized, "Unauthorized cookie")
				ctx.Abort()
				return
			}
			tokenString = cookie
		}

		if tokenString == "" || len(strings.Split(tokenString, ".")) != 3 {
			response.SendErrorResponse(ctx, http.StatusUnauthorized, "invalid token format")
			ctx.Abort()
			return
		}

		claims, err := utils.ValidateJwtToken(tokenString, mw.cfg)

		if err != nil {
			utils.LogErrorResponse(ctx, mw.logger, err)

			if strings.Contains(err.Error(), "token is expired") {
				response.SendErrorResponse(ctx, http.StatusUnauthorized, "token is expired")
			} else if strings.Contains(err.Error(), "signature is invalid") {
				response.SendErrorResponse(ctx, http.StatusUnauthorized, "invalid token, please check your token")
			} else {
				response.SendErrorResponse(ctx, http.StatusUnauthorized, "invalid token, please check your token")
			}
			ctx.Abort()
			return
		}

		auth := &auth{
			Id:    claims.ID,
			Email: claims.Email,
			Role:  claims.Role,
		}
		ctx.Set("auth", auth)

		ctx.Next()
	}
}

func GetAuth(ctx *gin.Context) *auth {
	value, _ := ctx.Get("auth")
	return value.(*auth)
}
