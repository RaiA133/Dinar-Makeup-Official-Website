package payment

import "github.com/midtrans/midtrans-go/coreapi"

func TransactionStatus(transactionStatusResp *coreapi.TransactionStatusResponse) string {
	var paymentStatus string
	if transactionStatusResp.TransactionStatus == "capture" {
		if transactionStatusResp.FraudStatus == "challenge" {
			paymentStatus = "challenge"
		} else if transactionStatusResp.FraudStatus == "accept" {
			paymentStatus = "success"
		}
	} else if transactionStatusResp.TransactionStatus == "settlement" {
		paymentStatus = "success"
	} else if transactionStatusResp.TransactionStatus == "deny" {
		paymentStatus = "deny"
	} else if transactionStatusResp.TransactionStatus == "cancel" || transactionStatusResp.TransactionStatus == "expire" {
		paymentStatus = "failed"
	} else if transactionStatusResp.TransactionStatus == "pending" {
		paymentStatus = "pending"
	}
	return paymentStatus
}
