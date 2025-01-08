package middleware

import (
	"github.com/RianIhsan/wedding-organizer-be/pkg/contextutils"
	"github.com/gin-gonic/gin"
)

func (mw *MiddlewareManager) RequestIdMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// before request
		requestId := ctx.GetHeader("X-Request-Id")
		if requestId == "" {
			requestId = contextutils.AssignRequestId(ctx)
		}

		// added requestId in header response
		ctx.Writer.Header().Set("X-Request-Id", requestId)

		ctx.Next()
	}
}
