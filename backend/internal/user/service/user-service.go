package service

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/pkg/cloudinary"
	cloudinary2 "github.com/cloudinary/cloudinary-go/v2"
	"mime/multipart"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model/dto"
	"github.com/RianIhsan/wedding-organizer-be/pkg/converter"
	"github.com/RianIhsan/wedding-organizer-be/pkg/httpErrors"
	"github.com/RianIhsan/wedding-organizer-be/pkg/utils"
	"github.com/google/uuid"

	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

const (
	basePrefix = "user-api"
	timeout    = 120
)

type userService struct {
	cfg    *config.Config
	pgRepo user.UserPostgresRepository
	rdRepo user.UserRedisRepository
	logger *logrus.Logger
	cld    *cloudinary2.Cloudinary
	cfg2   *config.CloudinaryConfig
}

// initialize user service

func NewUserService(config *ServiceConfig, cld *cloudinary2.Cloudinary, cfg *config.CloudinaryConfig) user.UserService {
	return &userService{
		cfg:    config.Config,
		pgRepo: config.UserPostgresRepository,
		rdRepo: config.UserRedisRepository,
		logger: config.Logger,
		cld:    cld,
		cfg2:   cfg,
	}
}

func (u *userService) GetCurrentUser(ctx context.Context, id string) (*dto.UserResponse, error) {
	parseId, err := uuid.Parse(id)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "UserService.GetCurrentUser.ParseId"))
	}

	cacheGetUser, err := u.rdRepo.Get(ctx, utils.GetRedisKey(basePrefix, id))
	if err != nil {
		u.logger.WithError(err).Debug("UserService.GetCurrentUser.redisRepo.Get")
	}

	if cacheGetUser != nil {
		return converter.ToUserResponse(cacheGetUser), nil
	}

	// get user from database
	currentUser, err := u.pgRepo.FindById(ctx, &model.User{Id: parseId})
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "UserService.GetCurrentUser.FindById"))
	}

	// set user to cache
	if err := u.rdRepo.Set(ctx, utils.GenerateRedisKey(basePrefix, id), timeout, currentUser); err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "UserService.GetCurrentUser.SetCache"))
	}

	return converter.ToUserResponse(currentUser), nil
}

func (u *userService) GetUserByID(ctx context.Context, id string) (*dto.UserResponse, error) {
	parseId, err := uuid.Parse(id)
	if err != nil {
		return nil, errors.New("failed parsing uuid")
	}

	userFound, err := u.pgRepo.FindById(ctx, &model.User{Id: parseId})
	if err != nil {
		return nil, errors.New("failed finding user by id")
	}

	return converter.ToUserResponse(userFound), nil
}

func (u *userService) Update(ctx context.Context, user *model.User, id string) (*dto.UserResponse, error) {
	parseId, err := uuid.Parse(id)
	if err != nil {
		return nil, errors.New("failed parsing uuid")
	}

	userFound, err := u.pgRepo.FindById(ctx, &model.User{Id: parseId})
	if err != nil {
		return nil, errors.New("user not found")
	}

	if err := user.PrepareUpdateUser(userFound); err != nil {
		return nil, errors.New("failed preparing user")
	}

	updatedUser, err := u.pgRepo.Update(ctx, userFound)
	if err != nil {
		return nil, errors.New("failed updating user")
	}

	// delete redis cache data
	if err := u.rdRepo.Delete(ctx, utils.GetRedisKey(basePrefix, id)); err != nil {
		u.logger.WithError(err).Error("UserService.Update.redisRepo.Delete")
	}

	return converter.ToUserResponse(updatedUser), nil
}

func (u *userService) Delete(ctx context.Context, user *model.User) (string, error) {
	userFound, err := u.pgRepo.FindById(ctx, &model.User{Id: user.Id})
	if err != nil {
		return "", errors.New("user not found")
	}
	// delete data from redis
	if err := u.rdRepo.Delete(ctx, utils.GetRedisKey(basePrefix, user.Id.String())); err != nil {
		return "", errors.New("failed deleting user from redis")
	}

	// delete data from db
	if err := u.pgRepo.Delete(ctx, &model.User{Id: userFound.Id}); err != nil {
		return "", errors.New("failed deleting user from postgres")
	}
	return "Success delete user", nil
}

func (u *userService) GetUsers(ctx context.Context, offset, limit int, search string) ([]*dto.GetUsersResponse, int, error) {
	users, total, err := u.pgRepo.FindUsers(ctx, offset, limit, search)
	if err != nil {
		return nil, 0, errors.New("failed fetching users")
	}
	var res []*dto.GetUsersResponse
	for _, user := range users {
		res = append(res, &dto.GetUsersResponse{
			Id:          user.Id,
			Name:        user.Name,
			Email:       user.Email,
			PhoneNumber: user.PhoneNumber,
			Address:     user.Address,
			Age:         user.Age,
		})
	}

	return res, total, nil
}

func (u *userService) UpdateAvatar(ctx context.Context, userId string, file multipart.File, fileName string) error {
	data, err := cloudinary.UploadImage(u.cld, u.cfg2, file, fileName)
	if err != nil {
		return errors.New("failed to upload image (cloudinary)")
	}

	err = u.pgRepo.UpdateAvatarUser(ctx, userId, data.ImageURL)
	if err != nil {
		return errors.New("failed updating user")
	}

	if err := u.rdRepo.Delete(ctx, utils.GetRedisKey(basePrefix, userId)); err != nil {
		u.logger.WithError(err).Error("UserService.Update.redisRepo.Delete")
	}

	return nil

}
