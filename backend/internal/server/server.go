package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	"github.com/redis/go-redis/v9"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

const (
	ctxTimeout = 5
	certFile   = "./ssl/server.crt"
	keyFile    = "./ssl/server.key"
)

type ServerConfig struct {
	App         *gin.Engine
	Logger      *logrus.Logger
	Cfg         *config.Config
	Db          *gorm.DB
	RedisClient *redis.Client
}

// Server
type Server struct {
	app         *gin.Engine
	logger      *logrus.Logger
	cfg         *config.Config
	db          *gorm.DB
	redisClient *redis.Client
}

// NewServer is a factory function
func NewServer(config *ServerConfig) *Server {
	return &Server{
		app:         config.App,
		logger:      config.Logger,
		cfg:         config.Cfg,
		db:          config.Db,
		redisClient: config.RedisClient,
	}
}

// running server with SLL/TLS or not
func (s *Server) Run() error {
	server := http.Server{
		Addr:         fmt.Sprintf("%s:%d", s.cfg.Server.Host, s.cfg.Server.Port),
		ReadTimeout:  time.Second * s.cfg.Server.ReadTimeout,
		WriteTimeout: time.Second * s.cfg.Server.WriteTimeout,
		Handler:      s.app,
	}

	// setup semua komponen aplikasi
	if err := s.Bootstrap(); err != nil {
		return errors.Wrap(err, "Server.Run.Bootstrap")
	}

	if s.cfg.Server.SSL {
		serverError := make(chan error)
		go func() {
			s.logger.Infof("TLS server listening on %s", server.Addr)
			serverError <- server.ListenAndServeTLS(certFile, keyFile)
		}()

		// listen signal interrupt/terminate from os
		quit := make(chan os.Signal)
		signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

		select {
		case err := <-serverError:
			{
				s.logger.Fatalf("Error starting TLS server: %v", err)
			}
		case <-quit:
			{
				ctx, shutdown := context.WithTimeout(context.Background(), ctxTimeout*time.Second)
				defer shutdown()
				if err := server.Shutdown(ctx); err != nil {
					s.logger.Fatalf("Error gracefully shutting down server: %v", err)
				}
			}
		}
		s.logger.Info("Server Exited Properly")
		return nil
	}

	serverError := make(chan error, 1)
	go func() {
		s.logger.Infof("Server listening on %s", server.Addr)
		serverError <- server.ListenAndServe()
	}()

	// listen signal interrupt/terminate from OS
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	select {
	case err := <-serverError:
		{
			s.logger.Fatalf("Error listening and serving: %v", err)
		}
	case <-quit:
		{
			ctx, shutdown := context.WithTimeout(context.Background(), ctxTimeout*time.Second)
			defer shutdown()
			if err := server.Shutdown(ctx); err != nil {
				s.logger.Fatalf("Error gracefully shutting down server: %v", err)
			}
		}
	}
	s.logger.Info("Server Exited Properly")
	return nil
}