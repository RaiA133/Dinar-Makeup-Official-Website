package middleware

import (
	"time"

	"github.com/RianIhsan/wedding-organizer-be/pkg/contextutils"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func (mw *MiddlewareManager) RequestLoggerMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		start := time.Now()
		ctx.Next()

		// after request
		latency := time.Since(start)
		mw.logger.WithFields(logrus.Fields{
			"RequestId": contextutils.GetRequestId(ctx),
			"ClientIP":  ctx.ClientIP(),
			"Method":    ctx.Request.Method,
			"UserAgent": ctx.Request.UserAgent(),
			"Path":      ctx.Request.URL.Path,
			"Status":    ctx.Writer.Status(),
			"Latency":   latency,
		}).Info("HTTP Request completed")
	}
}
