package dto

type CreateGalleryRequest struct {
	Title       string `form:"title"`
	Caption     string `form:"caption"`
	Description string `form:"description"`
}
