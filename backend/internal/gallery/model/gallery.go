package model

import "github.com/google/uuid"

type Gallery struct {
	Id          uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create"`
	Title       string    `gorm:"column:title;type:varchar(255)"`
	Caption     string    `gorm:"column:caption;type:varchar(255)"`
	Description string    `gorm:"column:description;type:text"`
	ImageURL    string    `gorm:"column:image_url;type:varchar(255)"`
	CreatedAt   int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create"`
	UpdatedAt   int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
	DeletedAt   *int64    `gorm:"column:deleted_at"`
}

func (Gallery) TableName() string {
	return "gallery"
}
