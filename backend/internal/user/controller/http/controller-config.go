package http

import (
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/sirupsen/logrus"
)

type ControllerConfig struct {
	Config      *config.Config
	Logger      *logrus.Logger
	AuthService user.AuthService
	UserService user.UserService
}
