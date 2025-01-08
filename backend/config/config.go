package config

import (
	"fmt"
	"github.com/spf13/viper"
	"time"
)

type Config struct {
	Server     ServerConfig
	Postgres   PostgresConfig
	Logger     LoggerConfig
	Redis      RedisConfig
	AWS        AwsConfig
	Cloudinary CloudinaryConfig
}
type ServerConfig struct {
	Host         string
	Port         int
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
	Mode         string
	SSL          bool
	JWTSecretKey string
}

type PostgresConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	Dbname   string
}

type LoggerConfig struct {
	Level       string
	Caller      bool
	Encoding    string
	Development bool
}

type AwsConfig struct {
	Endpoint       string
	MinioEndpoint  string
	MinioAccessKey string
	MinioSecretKey string
	UseSSL         bool
}

type RedisConfig struct {
	Addr         string
	DB           int
	MinIdleConns int
	PoolSize     int
	PoolTimeout  time.Duration
	Password     string
}

type CloudinaryConfig struct {
	CloudName string
	APIKey    string
	APISecret string
	URL       string
}

func NewAppConfig(configPath string) (*Config, error) {
	configFiles := map[string]string{
		"docker":     "./config/config-docker",
		"staging":    "",
		"production": "",
	}

	filename, isOk := configFiles[configPath]
	if !isOk {
		//return nil, fmt.Errorf("environment '%s' is not recognized", configPath)
		filename = "./config/config-local"
	}
	v := viper.New()
	v.SetConfigName(filename)
	v.AddConfigPath(".")
	v.AutomaticEnv()

	if err := v.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			return nil, fmt.Errorf("config file '%s' not found", filename)
		}
		return nil, fmt.Errorf("error reading config file, %v", err)
	}

	// parse config
	cfg := new(Config)
	if err := v.Unmarshal(cfg); err != nil {
		return nil, fmt.Errorf("unable to decode into struct, %v", err)
	}

	return cfg, nil
}
