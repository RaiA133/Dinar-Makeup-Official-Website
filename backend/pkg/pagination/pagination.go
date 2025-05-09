package pagination

import (
	"github.com/gin-gonic/gin"
	"math"
	"strconv"
)

type Pagination struct {
	Page       int
	Limit      int
	Offset     int
	TotalRows  int
	TotalPages int
}

func RequestPagination(c *gin.Context) *Pagination {
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		page = 1
	}
	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil || limit <= 0 {
		limit = 10
	}
	offset := (page - 1) * limit
	return &Pagination{
		Page:   page,
		Limit:  limit,
		Offset: offset,
	}
}

func (p *Pagination) SetTotalRows(total int) {
	p.TotalRows = total
	p.TotalPages = int(math.Ceil(float64(total) / float64(p.Limit)))
}
