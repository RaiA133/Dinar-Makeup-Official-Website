package order

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model/dto"
	"mime/multipart"
)

type ServiceInterface interface {
	CreateOrder(ctx context.Context, userId string, request *dto.CreateBookingWeddingRequest) (interface{}, error)
	GetOrders(ctx context.Context, offset, limit int, search string) ([]*dto.GetOrdersResponse, int, error)
	Callback(ctx context.Context, notifPayload map[string]interface{}) error
	CancelPayment(ctx context.Context, orderId string) error
	GetOrder(ctx context.Context, orderId string) (dto.GetOrdersResponse, error)
	RegisterDocument(ctx context.Context, orderId string, file multipart.File, fileName string) error
	GetTransactionsByUserId(ctx context.Context, userId string) ([]dto.GetOrdersResponse, error)
}
