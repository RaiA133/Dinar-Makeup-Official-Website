package model

import (
	productModel "github.com/RianIhsan/wedding-organizer-be/internal/products/model"
	userModel "github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/google/uuid"
)

type Order struct {
	Id                uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	IdOrder           string    `gorm:"column:id_order;type:VARCHAR(255)" json:"id_order"`
	UserId            uuid.UUID `gorm:"column:user_id;not null" json:"user_id"`
	ProductId         uuid.UUID `gorm:"column:product_id;not null" json:"product_id"`
	FinalAmount       int64     `gorm:"column:final_amount" json:"final_amount"`
	InstallmentAmount int64     `gorm:"column:installment_amount" json:"installment_amount"`
	Outstanding       int64     `gorm:"column:outstanding" json:"outstanding"`
	InstallmentStatus string    `gorm:"column:installment_status;type:VARCHAR(100)" json:"installment_status"`
	VaNumber          string    `gorm:"column:va_number;type:VARCHAR(100)" json:"va_number"`
	OrderStatus       string    `gorm:"column:order_status;type:VARCHAR(255)" json:"order_status"`
	PaymentStatus     string    `gorm:"column:payment_status;type:VARCHAR(255)" json:"payment_status"`
	PaymentMethod     string    `gorm:"column:payment_method;type:VARCHAR(255)" json:"payment_method"`
	Notes             string    `gorm:"column:notes;type:VARCHAR(255)" json:"notes"`
	WeddingDate       string    `gorm:"column:wedding_date;not null" json:"wedding_date"`
	TransactionTime   string    `gorm:"column:transaction_time;not null" json:"transaction_time"`
	ExpiredVa         string    `gorm:"column:expired_va;type:VARCHAR(255)" json:"expired_va"`
	CreatedAt         int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create" json:"created_at"`
	UpdatedAt         int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli" json:"updated_at"`
	DeleteAt          *int64    `gorm:"column:deleted_at" json:"deleted_at"`
	User              userModel.User
	Product           productModel.Product

	CustomerDetail CustomerDetail `gorm:"-"` // ✅ disimpan manual
	DetailOrder    DetailOrder    `gorm:"-"`
}

type DetailOrder struct {
	Id          uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	OrderID     uuid.UUID `gorm:"column:order_id;not null" json:"order_id"`
	AkadDate    string    `gorm:"column:akad_date;type:VARCHAR(255)" json:"akad_date"`
	ShowDate    string    `gorm:"column:show_date;type:VARCHAR(255)" json:"show_date"`
	Location    string    `gorm:"column:location;type:VARCHAR(255)" json:"location"`
	AkadTime    string    `gorm:"column:akad_time;type:VARCHAR(255)" json:"akad_time"`
	GuestCount  int64     `gorm:"column:guest_count" json:"guest_count"`
	TechMeeting string    `gorm:"column:tech_meeting;type:VARCHAR(255)" json:"tech_meeting"`
}

type CustomerDetail struct {
	Id             uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	OrderID        uuid.UUID `gorm:"column:order_id;not null" json:"order_id"`
	GroomFullName  string    `gorm:"column:groom_full_name;type:VARCHAR(255)" json:"groom_full_name"`
	BrideFullName  string    `gorm:"column:bride_full_name;type:VARCHAR(255)" json:"bride_full_name"`
	GroomAddress   string    `gorm:"column:groom_address;type:VARCHAR(255)" json:"groom_address"`
	BrideAddress   string    `gorm:"column:bride_address;type:VARCHAR(255)" json:"bride_address"`
	GroomEmail     string    `gorm:"column:groom_email;type:VARCHAR(255)" json:"groom_email"`
	BrideEmail     string    `gorm:"column:bride_email;type:VARCHAR(255)" json:"bride_email"`
	GroomInstagram string    `gorm:"column:groom_instagram;type:VARCHAR(255)" json:"groom_instagram"`
	BrideInstagram string    `gorm:"column:bride_instagram;type:VARCHAR(255)" json:"bride_instagram"`
}
