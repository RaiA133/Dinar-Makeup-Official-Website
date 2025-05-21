package postgres

import (
	"fmt"
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/pkg/errors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"time"
)

const (
	maxOpenConns    = 60
	connMaxLifetime = 120
	maxIdleConns    = 30
	connMaxIdleTime = 20
)

func NewPostgresConnection(cfg *config.Config) (*gorm.DB, error) {
	connString := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v sslmode=%v TimeZone=Asia/Jakarta",
		cfg.Postgres.Host,
		cfg.Postgres.User,
		cfg.Postgres.Password,
		cfg.Postgres.Dbname,
		cfg.Postgres.Port,
		cfg.Postgres.SSLMode,
	)

	db, err := gorm.Open(postgres.Open(connString), &gorm.Config{
		Logger:                 logger.Default.LogMode(getLoggerLevel(cfg)),
		SkipDefaultTransaction: true,
	})
	if err != nil {
		return nil, errors.Wrap(err, "NewPostgresConn.Open")
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, errors.Wrap(err, "NewPostgresConn.DB")
	}
	sqlDB.SetMaxOpenConns(maxOpenConns)
	sqlDB.SetConnMaxLifetime(time.Second * connMaxLifetime)
	sqlDB.SetConnMaxIdleTime(connMaxIdleTime * time.Second)
	sqlDB.SetMaxIdleConns(maxIdleConns)

	return db, nil
}

var fieldsLogrusLevelMap = map[string]logger.LogLevel{
	"info":   logger.Info,
	"warn":   logger.Warn,
	"error":  logger.Error,
	"silent": logger.Silent,
}

func getLoggerLevel(cfg *config.Config) logger.LogLevel {
	level, exist := fieldsLogrusLevelMap[cfg.Logger.Level]
	if !exist {
		level = logger.Info
	}
	return level
}
