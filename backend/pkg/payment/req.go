package payment

import (
	"errors"
	"fmt"

	"github.com/RianIhsan/wedding-organizer-be/internal/products/model/dto"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/sirupsen/logrus"
)

type CorePaymentRequest struct {
	OrderID     string
	Amount      int64
	PaymentType coreapi.CoreapiPaymentType
	FullName    string
	Email       string
	Phone       string
	Bank        midtrans.Bank
	DataProduct dto.GetProductResponse
}

func CreateCoreAPIPaymentRequest(coreClient coreapi.Client, req CorePaymentRequest) (*coreapi.ChargeResponse, error) {
	if req.OrderID == "" || req.Amount <= 0 {
		return nil, errors.New("invalid order ID or amount")
	}

	// Midtrans mewajibkan gross_amount == total item price
	paymentRequest := &coreapi.ChargeReq{
		PaymentType: req.PaymentType,
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  req.OrderID,
			GrossAmt: req.Amount,
		},
		CustomerDetails: &midtrans.CustomerDetails{
			FName: req.FullName,
			Email: req.Email,
			Phone: req.Phone,
		},
		Items: &[]midtrans.ItemDetails{
			{
				ID:    req.DataProduct.Id.String(),
				Name:  fmt.Sprintf("Uang Muka : %s", req.DataProduct.Name),
				Price: req.Amount,
				Qty:   1,
			},
		},
	}

	// Tambahan field sesuai metode pembayaran
	switch req.PaymentType {
	case coreapi.PaymentTypeBankTransfer:
		paymentRequest.BankTransfer = &coreapi.BankTransferDetails{
			Bank: req.Bank,
		}
	case coreapi.PaymentTypeQris, coreapi.PaymentTypeGopay:
		// Tidak butuh konfigurasi tambahan
	default:
		return nil, fmt.Errorf("payment type '%s' is not supported", req.PaymentType)
	}

	logrus.WithFields(logrus.Fields{
		"order_id": req.OrderID,
		"amount":   req.Amount,
		"type":     req.PaymentType,
		"name":     req.FullName,
		"email":    req.Email,
		"phone":    req.Phone,
	}).Info("Creating Midtrans payment request")

	resp, err := coreClient.ChargeTransaction(paymentRequest)
	if err != nil {
		logrus.WithError(err).WithField("order_id", req.OrderID).Error("Payment request failed")
		return nil, fmt.Errorf("payment request failed: %w", err)
	}

	logrus.WithFields(logrus.Fields{
		"order_id": req.OrderID,
		"status":   resp.TransactionStatus,
		"type":     req.PaymentType,
	}).Info("Payment request succeeded")

	return resp, nil
}
