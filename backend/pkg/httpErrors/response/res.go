package response

import (
	"github.com/RianIhsan/wedding-organizer-be/pkg/contextutils"
	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Status    int    `json:"status"`
	Message   string `json:"message"`
	RequestId string `json:"request_id"`
}

type SuccessResponse struct {
	Status    int    `json:"status"`
	Message   string `json:"message"`
	Data      any    `json:"data,omitempty"`
	RequestId string `json:"request_id"`
}

type SuccessResponseWithPagination struct {
	RequestId string `json:"request_id"`
	Status    int    `json:"status"`
	Message   string `json:"message"`
	Data      any    `json:"data,omitempty"`
	Metadata  any    `json:"metadata,omitempty"`
}

type PaginationMeta struct {
	CurrentPage int `json:"current_page"`
	Limit       int `json:"limit"`
	TotalPages  int `json:"total_pages"`
}

type PaginationRes struct {
	Message string         `json:"message"`
	Data    interface{}    `json:"data"`
	Meta    PaginationMeta `json:"meta"`
}

func SendSuccesResponse(c *gin.Context, statusCode int, message string, data any) {
	c.JSON(statusCode, SuccessResponse{
		RequestId: contextutils.GetRequestId(c),
		Message:   message,
		Status:    statusCode,
		Data:      data,
	})
}

func SendErrorResponse(c *gin.Context, statusCode int, message string) {
	c.JSON(statusCode, ErrorResponse{
		Status:    statusCode,
		Message:   message,
		RequestId: contextutils.GetRequestId(c),
	})
}

func SendSuccessResponseWithPagination(c *gin.Context, statusCode int, message string, data any, pagination any) {
	c.JSON(statusCode, SuccessResponseWithPagination{
		RequestId: contextutils.GetRequestId(c),
		Message:   message,
		Status:    statusCode,
		Data:      data,
		Metadata:  pagination,
	})
}
