package payment

import (
	"github.com/RianIhsan/wedding-organizer-be/config"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
)

func InitMidtransCore(config config.Config) coreapi.Client {
	var coreClient coreapi.Client
	coreClient.New(config.Midtrans.SecretKey, midtrans.Sandbox)
	return coreClient
}
