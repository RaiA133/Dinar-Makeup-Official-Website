package req

type AiReq struct {
	UserId  string `json:"user_id"`
	Sender  string `json:"sender"`
	Message string `json:"message"`
}

type AiResp struct {
	Message string `json:"message"`
}
