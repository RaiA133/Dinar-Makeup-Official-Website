package res

import "time"

type AiResponse struct {
	Id        int       `json:"id"`
	UserId    string    `json:"user_id"`
	Sender    string    `json:"sender"`
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
}
