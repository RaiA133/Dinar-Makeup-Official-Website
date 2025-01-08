package utils

import (
	"github.com/RianIhsan/wedding-organizer-be/pkg/contextutils"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	. "github.com/RianIhsan/wedding-organizer-be/pkg/validator"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

func ReadRequest(ctx *gin.Context, request any, binding binding.Binding) error {
	if err := ctx.ShouldBindWith(request, binding); err != nil {
		return httpErrors.NewBadRequestError(errors.Wrap(err, "ReadRequest.ShouldBindWith"))
	}

	//validate request
	if err := Validate.Struct(request); err != nil {
		return errors.Wrap(err, "ReadRequest.Validate")
	}

	return nil
}

func LogErrorResponse(ctx *gin.Context, logger *logrus.Logger, err error) {
	logger.WithError(err).WithFields(logrus.Fields{
		"requestId": contextutils.GetRequestId(ctx),
		"IPAddress": contextutils.GetIPAddress(ctx),
	}).Error("Logger error response")
}
