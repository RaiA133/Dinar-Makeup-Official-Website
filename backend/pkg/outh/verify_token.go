package oauth

import (
	"context"
	"google.golang.org/api/idtoken"
)

func VerifyGoogleIDToken(ctx context.Context, token, clientID string) (map[string]interface{}, error) {
	payload, err := idtoken.Validate(ctx, token, clientID)
	if err != nil {
		return nil, err
	}
	return payload.Claims, nil
}
