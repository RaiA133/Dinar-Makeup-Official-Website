package utils

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"time"
)

const prefix = "DNRWO"

func GenerateOrderID() string {
	now := time.Now()
	datePart := now.Format("020106") // ddmmyy (day 02, month 01, year 06)

	code := randomAlphaNumeric(5)

	return fmt.Sprintf("%s-%s-%s", prefix, datePart, code)
}

func randomAlphaNumeric(n int) string {
	const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	result := make([]byte, n)
	for i := 0; i < n; i++ {
		num, err := rand.Int(rand.Reader, big.NewInt(int64(len(letters))))
		if err != nil {
			// fallback to '0' in error case
			result[i] = '0'
			continue
		}
		result[i] = letters[num.Int64()]
	}
	return string(result)
}
