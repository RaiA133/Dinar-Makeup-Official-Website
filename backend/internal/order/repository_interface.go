package order

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model/dto"
	"github.com/google/uuid"
	"mime/multipart"
)

type RepositoryInterface interface {
	InsertOrder(ctx context.Context, data *model.Order) (*model.Order, error)
	FindOrdersData(ctx context.Context, offset, limit int, search string) ([]*model.Order, int64, error)
	CheckTransaction(ctx context.Context, orderID string) (string, error)
	GetOrderByID(ctx context.Context, orderID string) (*model.Order, error)
	ConfirmPayment(ctx context.Context, orderID, paymentStatus string) error
	UploadFileToCloud(ctx context.Context, file multipart.File, fileName, baseURL, secretID, secretKey string) (string, error)
	InsertDocument(ctx context.Context, entity *model.DocumentOrder) (*model.DocumentOrder, error)
	GetAllTransactionByUserID(ctx context.Context, userID string) ([]*model.Order, error)
	GetAllAkadDateWherePaymentSuccess(ctx context.Context) ([]string, error)
	GetOrderByIdOrder(ctx context.Context, idOrder string) (*model.Order, error)
	UpdateBookingWedding(ctx context.Context, orderId uuid.UUID, req dto.UpdateBookingWeddingRequest) error
	SoftDeleteOrderManual(ctx context.Context, orderId uuid.UUID) error
}
