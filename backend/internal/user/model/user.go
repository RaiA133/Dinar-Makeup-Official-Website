package model

import (
	"strings"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id            uuid.UUID `gorm:"column:id;primary_key;default:uuid_generate_v4();<-:create" json:"id"`          // ID pengguna
	Name          string    `gorm:"column:name" json:"name"`                                                       // Nama pengguna
	Username      string    `gorm:"column:username" json:"username"`                                               // Username pengguna
	Email         string    `gorm:"column:email" json:"email"`                                                     // Email pengguna
	Password      string    `gorm:"column:password" json:"password"`                                               // Password (untuk pengguna non-OAuth)
	PhoneNumber   string    `gorm:"column:phone_number" json:"phone_number"`                                       // Nomor telepon
	Avatar        string    `gorm:"column:avatar" json:"avatar"`                                                   // URL foto profil
	Address       string    `gorm:"column:address" json:"address"`                                                 // Alamat pengguna
	NIK           string    `gorm:"column:nik" json:"nik"`                                                         // Nomor Induk Kependudukan
	DateOfBirth   string    `gorm:"column:date_of_birth" json:"date_of_birth"`                                     // Tanggal lahir
	Age           string    `gorm:"column:age" json:"age"`                                                         // Umur pengguna
	Role          string    `gorm:"column:role" json:"role"`                                                       // Peran pengguna (user/admin)
	CreatedAt     int64     `gorm:"column:created_at;autoCreateTime:milli;<-:create" json:"created_at"`            // Waktu pembuatan
	UpdatedAt     int64     `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli" json:"updated_at"` // Waktu pembaruan
	GoogleID      string    `gorm:"column:google_id" json:"google_id"`                                             // ID pengguna di Google
	LoginProvider string    `gorm:"column:login_provider" json:"login_provider"`                                   // Provider login, misalnya "google"
	IsOAuth       bool      `gorm:"column:is_oauth" json:"is_oauth"`                                               // Menandakan apakah pengguna login melalui OAuth
	VerifiedEmail bool      `gorm:"column:verified_email" json:"verified_email"`                                   // Menandakan apakah email sudah diverifikasi
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
