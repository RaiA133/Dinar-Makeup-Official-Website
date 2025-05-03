package http

import (
	"github.com/RianIhsan/wedding-organizer-be/internal/gallery"
	"github.com/gin-gonic/gin"
)

func MapGalleryRoutes(galleryGroup *gin.RouterGroup, controller gallery.GalleryInterface) {
	galleryGroup.POST("/gallery", controller.CreateGallery())
}
