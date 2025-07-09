package config

import (
	"fmt"
	"github.com/spf13/viper"
	"os"
	"time"
)

type Config struct {
	Server     ServerConfig
	Postgres   PostgresConfig
	Logger     LoggerConfig
	Redis      RedisConfig
	AWS        AwsConfig
	Cloudinary CloudinaryConfig
	Midtrans   MidtransConfig
	Google     GoogleConfig
	Tencent    TencentCloud
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
	SSLMode  string
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
	CloudName  string
	APIKey     string
	APISecret  string
	FolderName string
}

type MidtransConfig struct {
	MerchantID string
	ClientKey  string
	SecretKey  string
}

type GoogleConfig struct {
	ClientID  string
	SecretKey string
}

type TencentCloud struct {
	TencentSecretID    string
	TencentSecretKey   string
	TencentRegion      string
	TencentBucketName  string
	TencentCosEndpoint string
}

func NewAppConfig(configPath string) (*Config, error) {
	// Cek config path yang diberikan
	v := viper.New()

	// Baca dari file .env
	v.AutomaticEnv()

	if _, err := os.Stat(".env"); err == nil {
		v.SetConfigFile(".env")
		v.SetConfigType("env")
		if err := v.ReadInConfig(); err != nil {
			return nil, fmt.Errorf("error reading .env file: %v", err)
		}
	}

	// Binding env ke struct
	cfg := new(Config)

	// Server
	cfg.Server.Host = v.GetString("SERVER_HOST")
	cfg.Server.Port = v.GetInt("SERVER_PORT")
	cfg.Server.ReadTimeout = time.Duration(v.GetInt("SERVER_READ_TIMEOUT")) * time.Second
	cfg.Server.WriteTimeout = time.Duration(v.GetInt("SERVER_WRITE_TIMEOUT")) * time.Second
	cfg.Server.Mode = v.GetString("SERVER_MODE")
	cfg.Server.SSL = v.GetBool("SERVER_SSL")
	cfg.Server.JWTSecretKey = v.GetString("SERVER_JWT_SECRET_KEY")

	// Postgres
	cfg.Postgres.User = v.GetString("POSTGRES_USER")
	cfg.Postgres.Password = v.GetString("POSTGRES_PASSWORD")
	cfg.Postgres.Host = v.GetString("POSTGRES_HOST")
	cfg.Postgres.Port = v.GetInt("POSTGRES_PORT")
	cfg.Postgres.Dbname = v.GetString("POSTGRES_DBNAME")
	cfg.Postgres.SSLMode = v.GetString("POSTGRES_SSL_MODE")

	// Redis
	cfg.Redis.Addr = v.GetString("REDIS_ADDR")
	cfg.Redis.DB = v.GetInt("REDIS_DB")
	cfg.Redis.MinIdleConns = v.GetInt("REDIS_MIN_IDLE_CONNS")
	cfg.Redis.PoolSize = v.GetInt("REDIS_POOL_SIZE")
	cfg.Redis.PoolTimeout = time.Duration(v.GetInt("REDIS_POOL_TIMEOUT")) * time.Second
	cfg.Redis.Password = v.GetString("REDIS_PASSWORD")

	// Logger
	cfg.Logger.Level = v.GetString("LOGGER_LEVEL")
	cfg.Logger.Caller = v.GetBool("LOGGER_CALLER")
	cfg.Logger.Encoding = v.GetString("LOGGER_ENCODING")
	cfg.Logger.Development = v.GetBool("LOGGER_DEVELOPMENT")

	// AWS
	cfg.AWS.Endpoint = v.GetString("AWS_ENDPOINT")
	cfg.AWS.MinioEndpoint = v.GetString("MINIO_ENDPOINT")
	cfg.AWS.MinioAccessKey = v.GetString("MINIO_ACCESS_KEY")
	cfg.AWS.MinioSecretKey = v.GetString("MINIO_SECRET_KEY")
	cfg.AWS.UseSSL = v.GetBool("MINIO_USE_SSL")

	// Cloudinary
	cfg.Cloudinary.CloudName = v.GetString("CLOUDINARY_CLOUD_NAME")
	cfg.Cloudinary.APIKey = v.GetString("CLOUDINARY_API_KEY")
	cfg.Cloudinary.APISecret = v.GetString("CLOUDINARY_API_SECRET")
	cfg.Cloudinary.FolderName = v.GetString("CLOUDINARY_FOLDER_NAME")

	// Midtrans
	cfg.Midtrans.MerchantID = v.GetString("MIDTRANS_MERCHANT_ID")
	cfg.Midtrans.ClientKey = v.GetString("MIDTRANS_CLIENT_KEY")
	cfg.Midtrans.SecretKey = v.GetString("MIDTRANS_SECRET_KEY")

	// Google
	cfg.Google.ClientID = v.GetString("GOOGLE_CLIENT_ID")
	cfg.Google.SecretKey = v.GetString("GOOGLE_SECRET_KEY")

	cfg.Tencent.TencentSecretID = v.GetString("TENCENT_SECRET_ID")
	cfg.Tencent.TencentSecretKey = v.GetString("TENCENT_SECRET_KEY")
	cfg.Tencent.TencentRegion = v.GetString("TENCENT_REGION")
	cfg.Tencent.TencentBucketName = v.GetString("TENCENT_BUCKET_NAME")
	cfg.Tencent.TencentCosEndpoint = v.GetString("TENCENT_COS_ENDPOINT")

	return cfg, nil
}
