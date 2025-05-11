package dto

type BookingData struct {
	TransactionID     string `json:"transaction_id"`
	OrderID           string `json:"order_id"`
	GrossAmount       string `json:"gross_amount"`
	PaymentType       string `json:"payment_type"`
	TransactionTime   string `json:"transaction_time"`
	TransactionStatus string `json:"transaction_status"`
	FraudStatus       string `json:"fraud_status"`
	StatusCode        string `json:"status_code"`
	BankName          string `json:"bank_name,omitempty"`
	VANumber          string `json:"va,omitempty"`
	StatusMessage     string `json:"status_message"`
	Currency          string `json:"currency"`
	ExpiryTime        string `json:"expiry_time"`
}

type GetOrdersResponse struct {
	Id                string                 `json:"id"`
	OrderId           string                 `json:"order_id"`
	InstallmentAmount int64                  `json:"installment_amount"`
	Outstanding       int64                  `json:"outstanding"`
	InstallmentStatus string                 `json:"installment_status"`
	WeddingDate       string                 `json:"wedding_date"`
	Notes             string                 `json:"notes"`
	User              UserInformation        `json:"user_information"`
	Product           ProductInformation     `json:"product_information"`
	Transaction       TransactionInformation `json:"transaction_information"`
}

type UserInformation struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	NIK     string `json:"nik"`
	Address string `json:"address"`
}

type ProductInformation struct {
	Id    string `json:"id"`
	Name  string `json:"name"`
	Price string `json:"price"`
}

type TransactionInformation struct {
	VaNumber        string `json:"va_number"`
	OrderStatus     string `json:"order_status"`
	PaymentStatus   string `json:"payment_status"`
	PaymentMethod   string `json:"payment_method"`
	TransactionTime string `json:"transaction_time"`
	ExpiredVa       string `json:"expired_va"`
}
