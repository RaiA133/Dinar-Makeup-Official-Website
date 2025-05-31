package order

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model/dto"
)

type ServiceInterface interface {
	CreateOrder(ctx context.Context, userId string, request *dto.CreateBookingWeddingRequest) (interface{}, error)
	GetOrders(ctx context.Context, offset, limit int) ([]*dto.GetOrdersResponse, int, error)
	Callback(ctx context.Context, notifPayload map[string]interface{}) error
	CancelPayment(ctx context.Context, orderId string) error
}
