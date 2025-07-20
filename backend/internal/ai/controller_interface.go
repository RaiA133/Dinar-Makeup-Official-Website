package ai

import "github.com/gin-gonic/gin"

type ControllerInterface interface {
	Insert() gin.HandlerFunc
	Find() gin.HandlerFunc
	FindAll() gin.HandlerFunc
	Delete() gin.HandlerFunc
}
