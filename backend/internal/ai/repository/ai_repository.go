package repository

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai"
	"github.com/RianIhsan/wedding-organizer-be/internal/ai/model"
	"gorm.io/gorm"
)

type aiPostgresRepository struct {
	db *gorm.DB
}

func NewAiPostgresRepository(db *gorm.DB) ai.AiPostgresInterface {
	return &aiPostgresRepository{
		db: db,
	}
}

func (au *aiPostgresRepository) Create(ctx context.Context, data *model.AIHistory) (*model.AIHistory, error) {
	db := au.db.WithContext(ctx)

	query := `
		INSERT INTO ai_history (user_id, sender, message)
		VALUES (?, ?, ?)
		RETURNING id, user_id, sender, message, timestamp
	`

	row := db.Raw(query, data.UserID, data.Sender, data.Message).Row()
	if err := row.Scan(&data.ID, &data.UserID, &data.Sender, &data.Message, &data.Timestamp); err != nil {
		return nil, err
	}
	return data, nil
}

func (au *aiPostgresRepository) FindAll(ctx context.Context, userId string) ([]model.AIHistory, error) {
	db := au.db.WithContext(ctx)

	var (
		histories []model.AIHistory
		query     string
		args      []interface{}
	)

	if userId > "" {
		query = `
			SELECT id, user_id, sender, message, timestamp
			FROM ai_history
			WHERE user_id = ?
			ORDER BY timestamp DESC
		`
		args = append(args, userId)
	} else {
		query = `
			SELECT id, user_id, sender, message, timestamp
			FROM ai_history
			ORDER BY timestamp DESC
		`
	}

	if err := db.Raw(query, args...).Scan(&histories).Error; err != nil {
		return nil, err
	}

	return histories, nil
}

func (au *aiPostgresRepository) FindOne(ctx context.Context, id int) (*model.AIHistory, error) {
	db := au.db.WithContext(ctx)

	query := `
		SELECT id, user_id, sender, message, timestamp
		FROM ai_history
		WHERE id = $1
	`

	var history model.AIHistory
	if err := db.Raw(query, id).Scan(&history).Error; err != nil {
		return nil, err
	}
	return &history, nil
}

func (au *aiPostgresRepository) DeleteAll(ctx context.Context, userID string) error {
	db := au.db.WithContext(ctx)

	var (
		query string
		args  []interface{}
	)

	if userID > "" {
		query = `DELETE FROM ai_history WHERE user_id = ?`
		args = append(args, userID)
	} else {
		query = `DELETE FROM ai_history`
	}

	if err := db.Exec(query, args...).Error; err != nil {
		return err
	}
	return nil
}
