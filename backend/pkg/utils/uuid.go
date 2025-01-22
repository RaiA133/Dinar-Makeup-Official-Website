package utils

import (
	"github.com/google/uuid"
)

// ParseUUID parses a string into a UUID.

func ParseUUID(s string) (uuid.UUID, error) {

	return uuid.Parse(s)

}
