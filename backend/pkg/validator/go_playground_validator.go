package validation

import (
	"errors"
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
	_ = validate.RegisterValidation("noSpace", noSpace)
}

func noSpace(fl validator.FieldLevel) bool {
	password := fl.Field().String()
	return !strings.Contains(password, " ")
}

func ValidateStruct(s interface{}) error {
	err := validate.Struct(s)
	if err != nil {
		var customErrors []string

		for _, err := range err.(validator.ValidationErrors) {
			switch err.Tag() {
			case "required":
				customErrors = append(customErrors, fmt.Sprintf("Field '%s' is required", err.Field()))
			case "min":
				customErrors = append(customErrors, fmt.Sprintf("Field '%s' must be at least %s characters long", err.Field(), err.Param()))
			case "email":
				customErrors = append(customErrors, fmt.Sprintf("Field '%s' must be a valid email address", err.Field()))
			case "noSpace":
				customErrors = append(customErrors, fmt.Sprintf("Field '%s' must not contain spaces", err.Field()))
			default:
				customErrors = append(customErrors, fmt.Sprintf("Validation failed on field '%s' with tag '%s'", err.Field(), err.Tag()))
			}
		}

		return errors.New(strings.Join(customErrors, "; "))
	}
	return nil
}
