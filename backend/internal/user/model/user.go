package model

import (
	"strings"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id          uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create"`
	Name        string    `gorm:"column:name"`
	Username    string    `gorm:"column:username"` // allow read and create
	Email       string    `gorm:"column:email"`
	Password    string    `gorm:"column:password"`
	PhoneNumber string    `gorm:"column:phone_number"`
	Avatar      string    `gorm:"column:avatar"`
	Address     string    `gorm:"column:address"`
	NIK         string    `gorm:"column:nik"`
	DateOfBirth string    `gorm:"column:date_of_birth"`
	Age         string    `gorm:"column:age"`
	Role        string    `gorm:"column:role"`
	CreatedAt   int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create"` // allow read and create
	UpdatedAt   int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

func (u *User) TableName() string {
	return "users"
}

func (u *User) HashPassword() error {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.Wrap(err, "User.HashPassword.GenerateFromPassword")
	}
	u.Password = string(hashedPass)
	return nil

}

// prepare create user
func (u *User) PrepareCreate() error {
	u.Email = strings.ToLower(strings.TrimSpace(u.Email))
	u.Password = strings.TrimSpace(u.Password)

	if err := u.HashPassword(); err != nil {
		return err
	}
	return nil
}

// prepare update user
func (u *User) PrepareUpdateUser(oldData *User) error {
	if u.Name != "" {
		oldData.Name = u.Name
	}
	if u.PhoneNumber != "" {
		oldData.PhoneNumber = u.PhoneNumber
	}
	if u.Address != "" {
		oldData.Address = u.Address
	}
	if u.NIK != "" {
		oldData.NIK = u.NIK
	}
	if u.DateOfBirth != "" {
		oldData.DateOfBirth = u.DateOfBirth
	}
	if u.Age != "" {
		oldData.Age = u.Age
	}
	return nil
}

// compare password
func (u *User) ComparePassword(hashedPassword string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(u.Password)); err != nil {
		return errors.Wrap(err, "User.ComparePassword.CompareHashAndPassword")
	}
	return nil
}
