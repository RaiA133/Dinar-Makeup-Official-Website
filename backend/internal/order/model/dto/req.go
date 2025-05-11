package dto

type CreateBookingWeddingRequest struct {
	ProductId     string `json:"product_id"`
	Amount        int64  `json:"amount"`
	BookingDate   string `json:"booking_date"`
	PaymentMethod string `json:"payment_method"`
	Notes         string `json:"notes"`
}
