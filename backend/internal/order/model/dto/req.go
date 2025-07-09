package dto

type CreateBookingWeddingRequest struct {
	ProductId     string `json:"product_id"`
	Amount        int64  `json:"amount"`
	BookingDate   string `json:"booking_date"`
	PaymentMethod string `json:"payment_method"`
	Notes         string `json:"notes"`

	CustomerDetail CustomerDetailRequest `json:"customer_detail"`
	DetailOrder    DetailOrderRequest    `json:"detail_order"`
}

type CustomerDetailRequest struct {
	GroomFullName  string `json:"groom_full_name"`
	BrideFullName  string `json:"bride_full_name"`
	GroomAddress   string `json:"groom_address"`
	BrideAddress   string `json:"bride_address"`
	GroomEmail     string `json:"groom_email"`
	BrideEmail     string `json:"bride_email"`
	GroomInstagram string `json:"groom_instagram"`
	BrideInstagram string `json:"bride_instagram"`
}

type DetailOrderRequest struct {
	AkadDate    string `json:"akad_date"`
	ShowDate    string `json:"show_date"`
	Location    string `json:"location"`
	AkadTime    string `json:"akad_time"`
	GuestCount  int64  `json:"guest_count"`
	TechMeeting string `json:"tech_meeting"`
}

type InsertDocumentRequest struct {
	OrderId string `json:"order_id"`
}
