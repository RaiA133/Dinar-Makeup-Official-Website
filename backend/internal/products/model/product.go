package model

import "github.com/google/uuid"

type Product struct {
	Id           uuid.UUID            `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	Name         string               `gorm:"column:name" json:"name"`
	Price        int64                `gorm:"column:price" json:"price"`
	Currency     string               `gorm:"column:currency" json:"currency"`
	Description  string               `gorm:"column:description" json:"description"`
	Notes        string               `gorm:"column:notes" json:"notes"`
	CreatedAt    int64                `gorm:"column:created_at;autoCreateTime:milli;<-:create" json:"created_at"`
	UpdatedAt    int64                `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli" json:"updated_at"`
	DeletedAt    *int64               `gorm:"column:deleted_at" json:"deleted_at"`
	Images       []ProductImage       `gorm:"foreignKey:ProductId;references:Id" json:"images"`
	DetailGroups []ProductDetailGroup `gorm:"foreignKey:ProductId;references:Id" json:"-"`
}

type ProductImage struct {
	Id        uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	ProductId uuid.UUID `gorm:"column:product_id" json:"product_id"`
	PublicId  string    `gorm:"column:public_id" json:"public_id"`
	ImageURL  string    `gorm:"column:image_url" json:"image_url"`
	CreatedAt int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create" json:"created_at"`
	UpdatedAt int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli" json:"updated_at"`
	DeleteAt  *int64    `gorm:"column:deleted_at" json:"deleted_at"`
}

type ProductDetailGroup struct {
	Id          uuid.UUID           `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	ProductId   uuid.UUID           `gorm:"column:product_id" json:"product_id"`
	GroupName   string              `gorm:"column:group_name" json:"group_name"` // e.g. "makeup", "dekorasi"
	CreatedAt   int64               `gorm:"column:created_at;autoCreateTime:milli;<-:create" json:"created_at"`
	UpdatedAt   int64               `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli" json:"updated_at"`
	DetailItems []ProductDetailItem `gorm:"foreignKey:GroupId;references:Id" json:"-"`
}

type ProductDetailItem struct {
	Id          uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`
	GroupId     uuid.UUID `gorm:"column:group_id" json:"group_id"`
	Description string    `gorm:"column:description" json:"description"` // e.g. "1 fotografer", "Sound system"
	CreatedAt   int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create" json:"created_at"`
	UpdatedAt   int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli" json:"updated_at"`
}

func (p *Product) TableName() string {
	return "product"
}

func (p *ProductImage) TableName() string {
	return "product_image"
}

func (p *ProductDetailGroup) TableName() string {
	return "product_detail_group"
}

func (p *ProductDetailItem) TableName() string {
	return "product_detail_item"
}
