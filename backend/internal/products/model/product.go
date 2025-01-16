package model

import "github.com/google/uuid"

type Product struct {
	Id          uuid.UUID      `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create"`
	Name        string         `gorm:"column:name"`
	Price       int64          `gorm:"column:price"`
	Description string         `gorm:"column:description"`
	CreatedAt   int64          `gorm:"column:created_at;autoCreateTime:milli;<-:create"`
	UpdatedAt   int64          `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
	DeletedAt   *int64         `gorm:"column:delete_at"`
	Images      []ProductImage `gorm:"foreignKey:ProductId;references:Id"`
}

type ProductImage struct {
	Id        uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create"`
	ProductId uuid.UUID `gorm:"column:product_id"`
	ImageURL  string    `gorm:"column:image_url"`
	CreatedAt int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create"`
	UpdatedAt int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
	DeleteAt  *int64    `gorm:"column:delete_at"`
}

func (p *Product) TableName() string {
	return "product"
}

func (p *ProductImage) TableName() string {
	return "product_image"
}
