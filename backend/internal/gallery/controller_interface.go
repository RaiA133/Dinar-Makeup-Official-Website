package gallery

import "github.com/gin-gonic/gin"

type GalleryInterface interface {
	CreateGallery() gin.HandlerFunc
}
