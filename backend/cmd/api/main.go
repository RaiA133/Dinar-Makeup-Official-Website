package main

import (
	"context"
	"log"
	"os"

	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/RianIhsan/wedding-organizer-be/internal/server"
	"github.com/RianIhsan/wedding-organizer-be/pkg/db/postgres"
	"github.com/RianIhsan/wedding-organizer-be/pkg/db/redis"
	"github.com/RianIhsan/wedding-organizer-be/pkg/logger"
	"github.com/gin-gonic/gin"
)

func main() {
	//gin.SetMode(gin.ReleaseMode)

	// -----------------------------------------------------------------------------------------------------------
	// initializing app config
	cfg, err := config.NewAppConfig(os.Getenv("config"))
	if err != nil {
		log.Fatal(err)
	}

	// -----------------------------------------------------------------------------------------------------------
	// initializing Logger
	apiLogger := logger.NewLogrusLogger(cfg)

	// -----------------------------------------------------------------------------------------------------------
	// initializing postgreSQL connection
	psqlDB, err := postgres.NewPostgresConnection(cfg)
	if err != nil {
		apiLogger.Fatalf("Postgresql initialize: %v", err)
	}
	apiLogger.Info("PostgreSQL connected")

	// -----------------------------------------------------------------------------------------------------------
	// initializing redis client
	redisClient := redis.NewRedisClient(cfg)
	defer redisClient.Close()
	if err := redisClient.Ping(context.Background()).Err(); err != nil {
		apiLogger.Fatal("Redis ping: %v", err)
	}
	apiLogger.Info("Redis connected")

	// -----------------------------------------------------------------------------------------------------------


	// -----------------------------------------------------------------------------------------------------------
	// instance gin framework
	app := gin.New()

	// -----------------------------------------------------------------------------------------------------------
	// create a new instance server
	s := server.NewServer(&server.ServerConfig{
		App:         app,
		Cfg:         cfg,
		Logger:      apiLogger,
		Db:          psqlDB,
		RedisClient: redisClient,
	})

	if err := s.Run(); err != nil {
		apiLogger.Fatal(err)
	}

}
