package service

import (
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/sirupsen/logrus"
)

// ServiceConfig will hold repositories that will eventually be injected into
// this service layer

type ServiceConfig struct {
	UserPostgresRepository user.UserPostgresRepository
	UserRedisRepository    user.UserRedisRepository
	Logger                 *logrus.Logger
	Config                 *config.Config
}
