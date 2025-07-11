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

type DocumentOrderResponse struct {
	Id       string `json:"id"`
	OrderID  string `json:"order_id"`
	URL      string `json:"url"`
	FileName string `json:"file_name"`
}

type GetOrdersResponse struct {
	Id                string                  `json:"id"`
	OrderId           string                  `json:"order_id"`
	InstallmentAmount int64                   `json:"installment_amount"`
	Outstanding       int64                   `json:"outstanding"`
	InstallmentStatus string                  `json:"installment_status"`
	WeddingDate       string                  `json:"wedding_date"`
	Notes             string                  `json:"notes"`
	User              UserInformation         `json:"user_information"`
	Product           ProductInformation      `json:"product_information"`
	Transaction       TransactionInformation  `json:"transaction_information"`
	DocumentOrders    []DocumentOrderResponse `json:"document_orders"` // ✅ ditambahkan
	DetailOrder       DetailOrderResponse     `json:"detail_order"`
	CustomerDetail    CustomerDetailResponse  `json:"customer_detail"`
}

type DetailOrderResponse struct {
	Id          string `json:"id"`
	AkadDate    string `json:"akad_date"`
	ShowDate    string `json:"show_date"`
	Location    string `json:"location"`
	AkadTime    string `json:"akad_time"`
	GuestCount  int64  `json:"guest_count"`
	TechMeeting string `json:"tech_meeting"`
}

type CustomerDetailResponse struct {
	Id             string `json:"id"`
	GroomFullName  string `json:"groom_full_name"`
	BrideFullName  string `json:"bride_full_name"`
	GroomAddress   string `json:"groom_address"`
	BrideAddress   string `json:"bride_address"`
	GroomEmail     string `json:"groom_email"`
	BrideEmail     string `json:"bride_email"`
	GroomInstagram string `json:"groom_instagram"`
	BrideInstagram string `json:"bride_instagram"`
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
