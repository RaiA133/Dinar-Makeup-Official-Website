package service

import (
	"context"

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
}

// initialize user service

func NewUserService(config *ServiceConfig) user.UserService {
	return &userService{
		cfg:    config.Config,
		pgRepo: config.UserPostgresRepository,
		rdRepo: config.UserRedisRepository,
		logger: config.Logger,
	}
}

func (u *userService) GetCurrentUser(ctx context.Context, id string) (*dto.UserResponse, error) {
	parseId, err := uuid.Parse(id)
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "UserService.GetCurrentUser.ParseId"))
	}

	cacheGetUser, err := u.rdRepo.Get(ctx, utils.GetRedisKey(basePrefix, id))
	if err != nil {
		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "UserService.GetCurrentUser.GetCache"))
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

// Update update current user
// func (u *userService) Update(ctx context.Context, user *model.User) (*dto.UserResponse, error) {
// 	userFound, err := u.pgRepo.FindById(ctx, &model.User{Id: user.Id})
// 	if err != nil {
// 		return nil, httpErrors.NewNotFoundError(errors.Wrap(err, "UserService.Update.FindById"))
// 	}

// 	if err := user.PrepareUpdate(userFound); err != nil {
// 		return nil, httpErrors.NewInternalServerError(err)
// 	}

// 	updatedUser, err := u.pgRepo.Update(ctx, userFound)
// 	if err != nil {
// 		return nil, httpErrors.NewInternalServerError(errors.Wrap(err, "UserService.GetCurrentUser.Update"))
// 	}

// 	// delete redis cache data
// 	if err := u.redisRepo.Delete(ctx, utils.GetRedisKey(basePrefix, user.Id.String())); err != nil {
// 		u.logger.WithError(err).Error("UserService.Update.redisRepo.Delete")
// 	}

// 	return converter.ToUserResponse(updatedUser), nil
// }
