package service

import (
	"context"
	"fmt"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/order"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/order/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/internal/products"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/pkg/payment"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"strconv"
)

type ServiceConfig struct {
	OrderRepo      order.RepositoryInterface
	UserService    user.UserService
	ProductService products.ProductService
	Config         *config.Config
	Logger         *logrus.Logger
}

type orderService struct {
	pgRepo         order.RepositoryInterface
	UserService    user.UserService
	ProductService products.ProductService
	coreClient     coreapi.Client
}

func NewOrderService(config *ServiceConfig, coreMidtrans coreapi.Client) order.ServiceInterface {
	return &orderService{
		pgRepo:         config.OrderRepo,
		UserService:    config.UserService,
		ProductService: config.ProductService,
		coreClient:     coreMidtrans,
	}
}

func (or *orderService) CreateOrder(ctx context.Context, userId string, req *dto.CreateBookingWeddingRequest) (interface{}, error) {
	productIdUUID, err := utils.ParseUUID(req.ProductId)
	if err != nil {
		return nil, errors.New("invalid product id")
	}

	if !isValidPaymentMethod(req.PaymentMethod) {
		return nil, errors.New("invalid payment method")
	}

	dataUser, err := or.UserService.GetCurrentUser(ctx, userId)
	if err != nil {
		return nil, errors.New("user id not found")
	}

	dataProduct, err := or.ProductService.GetProduct(ctx, productIdUUID)
	if err != nil {
		return nil, errors.New("product not found")
	}

	var paymentType coreapi.CoreapiPaymentType
	var bank midtrans.Bank
	genOrderId := utils.GenerateOrderID()

	switch req.PaymentMethod {
	case "qris":
		paymentType = coreapi.PaymentTypeQris
	case "gopay":
		paymentType = coreapi.PaymentTypeGopay
	case "bank_transfer", "bca", "bri", "bni", "cimb", "mandiri", "maybank", "permata", "mega":
		paymentType = coreapi.PaymentTypeBankTransfer
		switch req.PaymentMethod {
		case "bca":
			bank = midtrans.BankBca
		case "bri":
			bank = midtrans.BankBri
		case "bni":
			bank = midtrans.BankBni
		case "cimb":
			bank = midtrans.BankCimb
		case "mandiri":
			bank = midtrans.BankMandiri
		case "maybank":
			bank = midtrans.BankMaybank
		case "permata":
			bank = midtrans.BankPermata
		case "mega":
			bank = midtrans.BankMega
		default:
			return nil, errors.New("invalid payment method")
		}
	default:
		return nil, errors.New("unsupported payment method")
	}

	var bankName string
	var va string
	var instalmentStatus string
	outstanding := 0
	outstanding = int(dataProduct.Price - req.Amount)

	if outstanding == 0 {
		instalmentStatus = "PAID"
	} else if outstanding != 0 {
		instalmentStatus = "OUTSTANDING"
	}

	orderToMidtrans, err := payment.CreateCoreAPIPaymentRequest(or.coreClient, payment.CorePaymentRequest{
		OrderID:     genOrderId,
		Amount:      req.Amount,
		PaymentType: paymentType,
		FullName:    dataUser.Name,
		Email:       dataUser.Email,
		Phone:       dataUser.PhoneNumber,
		Bank:        bank,
		DataProduct: *dataProduct,
	})

	if orderToMidtrans.VaNumbers != nil && len(orderToMidtrans.VaNumbers) > 0 {
		bankName = orderToMidtrans.VaNumbers[0].Bank
		va = orderToMidtrans.VaNumbers[0].VANumber
	}

	// Format Response
	resFormatMidtrans := dto.BookingData{
		TransactionID:     orderToMidtrans.TransactionID,
		OrderID:           orderToMidtrans.OrderID,
		GrossAmount:       orderToMidtrans.GrossAmount,
		PaymentType:       orderToMidtrans.PaymentType,
		TransactionTime:   orderToMidtrans.TransactionTime,
		TransactionStatus: orderToMidtrans.TransactionStatus,
		FraudStatus:       orderToMidtrans.FraudStatus,
		BankName:          bankName,
		VANumber:          va,
		StatusMessage:     orderToMidtrans.StatusMessage,
		Currency:          orderToMidtrans.Currency,
		ExpiryTime:        orderToMidtrans.ExpiryTime,
	}

	if err != nil {
		logrus.WithError(err).Error("failed to create payment request")
		return nil, fmt.Errorf("error creating core payment: %w", err)
	}

	// Insert To DB
	_, err = or.pgRepo.InsertOrder(ctx, &model.Order{
		IdOrder:           genOrderId,
		UserId:            dataUser.Id,
		ProductId:         dataProduct.Id,
		FinalAmount:       dataProduct.Price,
		InstallmentAmount: req.Amount,
		Outstanding:       int64(outstanding),
		InstallmentStatus: instalmentStatus,
		VaNumber:          resFormatMidtrans.VANumber,
		OrderStatus:       "pending",
		PaymentStatus:     "pending",
		PaymentMethod:     req.PaymentMethod,
		Notes:             req.Notes,
		WeddingDate:       req.BookingDate,
		TransactionTime:   resFormatMidtrans.TransactionTime,
		ExpiredVa:         resFormatMidtrans.ExpiryTime,
		CustomerDetail: model.CustomerDetail{
			GroomFullName:  req.CustomerDetail.GroomFullName,
			BrideFullName:  req.CustomerDetail.BrideFullName,
			GroomAddress:   req.CustomerDetail.GroomAddress,
			BrideAddress:   req.CustomerDetail.BrideAddress,
			GroomEmail:     req.CustomerDetail.GroomEmail,
			BrideEmail:     req.CustomerDetail.BrideEmail,
			GroomInstagram: req.CustomerDetail.GroomInstagram,
			BrideInstagram: req.CustomerDetail.BrideInstagram,
		},
		DetailOrder: model.DetailOrder{
			AkadDate:    req.DetailOrder.AkadDate,
			ShowDate:    req.DetailOrder.ShowDate,
			Location:    req.DetailOrder.Location,
			AkadTime:    req.DetailOrder.AkadTime,
			GuestCount:  req.DetailOrder.GuestCount,
			TechMeeting: req.DetailOrder.TechMeeting,
		},
	})
	if err != nil {
		logrus.WithError(err).Error("failed to insert order to DB")
		return nil, fmt.Errorf("failed to save order: %w", err)
	}

	return resFormatMidtrans, nil
}

func (or *orderService) GetOrders(ctx context.Context, offset, limit int, search string) ([]*dto.GetOrdersResponse, int, error) {
	data, total, err := or.pgRepo.FindOrdersData(ctx, offset, limit, search)
	if err != nil {
		return nil, 0, errors.New("failed to fetch orders data")
	}

	var res []*dto.GetOrdersResponse
	for _, order := range data {
		res = append(res, &dto.GetOrdersResponse{
			Id:                order.Id.String(),
			OrderId:           order.IdOrder,
			InstallmentAmount: order.InstallmentAmount,
			Outstanding:       order.Outstanding,
			InstallmentStatus: order.InstallmentStatus,
			WeddingDate:       order.WeddingDate,
			Notes:             order.Notes,
			User: dto.UserInformation{
				Id:      order.User.Id.String(),
				Name:    order.User.Name,
				Email:   order.User.Email,
				Phone:   order.User.PhoneNumber,
				NIK:     order.User.NIK,
				Address: order.User.Address,
			},
			Product: dto.ProductInformation{
				Id:    order.Product.Id.String(),
				Name:  order.Product.Name,
				Price: strconv.FormatInt(order.Product.Price, 10),
			},
			Transaction: dto.TransactionInformation{
				VaNumber:        order.VaNumber,
				OrderStatus:     order.OrderStatus,
				PaymentStatus:   order.PaymentStatus,
				PaymentMethod:   order.PaymentMethod,
				TransactionTime: order.TransactionTime,
				ExpiredVa:       order.ExpiredVa,
			},
		})
	}

	return res, int(total), nil
}

func (or *orderService) Callback(ctx context.Context, notifPayload map[string]interface{}) error {
	orderID, exists := notifPayload["order_id"].(string)
	if !exists {
		return errors.New("order id is required")
	}
	status, err := or.pgRepo.CheckTransaction(ctx, orderID)
	if err != nil {
		return errors.New("failed to check transaction")
	}

	dataOrder, err := or.pgRepo.GetOrderByID(ctx, orderID)
	if err != nil {
		return errors.New("failed to fetch order data")
	}
	if status == "success" {
		if err := or.ConfirmPayment(ctx, dataOrder.IdOrder); err != nil {
			return err
		}
	} else if status == "failed" {
		if err := or.CancelPayment(ctx, dataOrder.IdOrder); err != nil {
			return errors.New("failed to confirm payment 2")
		}
	}
	return nil
}

func (or *orderService) ConfirmPayment(ctx context.Context, orderID string) error {
	data, err := or.pgRepo.GetOrderByID(ctx, orderID)
	if err != nil {
		return errors.New("failed to fetch order data")
	}
	data.PaymentStatus = "success"
	if err := or.pgRepo.ConfirmPayment(ctx, data.IdOrder, data.PaymentStatus); err != nil {
		return err
	}
	return nil
}

func (or *orderService) CancelPayment(ctx context.Context, orderID string) error {
	data, err := or.pgRepo.GetOrderByID(ctx, orderID)

	if err != nil {
		return errors.New("failed to fetch order data")
	}

	data.PaymentStatus = "failed"

	if err := or.pgRepo.ConfirmPayment(ctx, data.IdOrder, data.PaymentStatus); err != nil {
		return errors.New("failed to cancel payment")
	}

	return nil
}

func isValidPaymentMethod(method string) bool {
	validPaymentMethods := map[string]bool{
		"qris":          true,
		"bank_transfer": true,
		"gopay":         true,
		"bca":           true,
		"bri":           true,
		"bni":           true,
		"cimb":          true,
	}
	return validPaymentMethods[method]
}
