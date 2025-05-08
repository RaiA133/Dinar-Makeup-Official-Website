package cloudinary

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/pkg/errors"
	"mime/multipart"
	"time"
)

// InitializeCloudinary initializes the Cloudinary client
func InitializeCloudinary(cfg *config.CloudinaryConfig) (*cloudinary.Cloudinary, error) {
	cld, err := cloudinary.NewFromParams(cfg.CloudName, cfg.APIKey, cfg.APISecret)
	if err != nil {
		return nil, errors.Wrap(err, "init cloudinary")
	}
	return cld, nil
}

func UploadImage(cld *cloudinary.Cloudinary, cfg *config.CloudinaryConfig, file multipart.File, fileName string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := cld.Upload.Upload(ctx, file, uploader.UploadParams{
		PublicID: fileName,       // Optional: specify a public ID for the image
		Folder:   cfg.FolderName, // Optional: specify a folder in Cloudinary
	})
	if err != nil {
		return "", errors.Wrap(err, "upload image")
	}

	return result.SecureURL, nil
}
