package order

import "github.com/gin-gonic/gin"

type ControllerInterface interface {
	BookingWedding() gin.HandlerFunc
	GetBookingWedding() gin.HandlerFunc
	CallbackURL() gin.HandlerFunc
	GetOrder() gin.HandlerFunc
	RegisterDocument() gin.HandlerFunc
	GetOrdersByUserId() gin.HandlerFunc
	UpdateOrder() gin.HandlerFunc
	DeleteOrder() gin.HandlerFunc
}
