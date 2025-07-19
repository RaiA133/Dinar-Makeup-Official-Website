package model

import "time"

type AIHistory struct {
	ID        int       `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID    string    `gorm:"not null" json:"user_id"`
	Sender    string    `gorm:"type:varchar(10);not null;check:sender IN ('user','bot')" json:"sender"`
	Message   string    `gorm:"type:text;not null" json:"message"`
	Timestamp time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"timestamp"`
}
