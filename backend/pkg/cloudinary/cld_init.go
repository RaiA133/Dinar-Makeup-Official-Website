package cloudinary

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/pkg/errors"
	"mime/multipart"
)

// InitializeCloudinary initializes the Cloudinary client
func InitializeCloudinary(cfg *config.CloudinaryConfig) (*cloudinary.Cloudinary, error) {
	cld, err := cloudinary.NewFromParams(cfg.CloudName, cfg.APIKey, cfg.APISecret)
	if err != nil {
		return nil, errors.Wrap(err, "init cloudinary")
	}
	return cld, nil
}

func UploadImage(cld *cloudinary.Cloudinary, file multipart.File, fileName string) (string, error) {

	result, err := cld.Upload.Upload(context.Background(), file, uploader.UploadParams{
		PublicID: fileName, // Optional: specify a public ID for the image
		Folder:   "avatar", // Optional: specify a folder in Cloudinary
	})
	if err != nil {
		return "", errors.Wrap(err, "upload image")
	}

	return result.SecureURL, nil
}
