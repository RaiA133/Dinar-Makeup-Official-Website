package repository

import (
	"context"
	"github.com/RianIhsan/wedding-organizer-be/internal/user"
	"github.com/RianIhsan/wedding-organizer-be/internal/user/model"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository(db *gorm.DB) user.UserPostgresRepository {
	return &userPostgresRepository{db: db}
}

func (u *userPostgresRepository) Create(ctx context.Context, entity *model.User) (*model.User, error) {
	db := u.db.WithContext(ctx)
	/**
	INSERT INTO "users" ("email","password","first_name","last_name","created_at","updated_at")
	VALUES (?,?,?,?,?,?) RETURNING "id"
	*/
	if err := db.Create(entity).Error; err != nil {
		return nil, err
	}
	return entity, nil
}

func (u *userPostgresRepository) Update(ctx context.Context, entity *model.User) (*model.User, error) {
	DB := u.db.WithContext(ctx)

	/**
	UPDATE "users" SET "email"=?,"password"=?,"first_name"=?,"last_name"=?,"avatar"=?,"city"=?,"phone_number"=?,"updated_at"=? WHERE id=?
	*/
	if err := DB.Model(model.User{}).Where("id = ?", entity.Id).Updates(entity).Error; err != nil {
		return nil, err
	}
	return entity, nil
}

func (u *userPostgresRepository) Delete(ctx context.Context, entity *model.User) error {
	DB := u.db.WithContext(ctx)
	if err := DB.Model(model.User{}).Where("id = ?", entity.Id).Delete(&model.User{}).Error; err != nil {
		return err
	}
	return nil

}

func (u *userPostgresRepository) FindByEmail(ctx context.Context, entity *model.User) (*model.User, error) {
	user := new(model.User)
	DB := u.db.WithContext(ctx)

	// SELECT * FROM "users" WHERE "users"."email" = ? LIMIT 1
	if err := DB.Where(model.User{Email: entity.Email}).Take(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (u *userPostgresRepository) FindById(ctx context.Context, entity *model.User) (*model.User, error) {
	user := new(model.User)
	DB := u.db.WithContext(ctx)

	// SELECT * FROM "users" WHERE "users"."id" = ? LIMIT 1
	if err := DB.Where(model.User{Id: entity.Id}).Take(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (u *userPostgresRepository) FindAlreadyExistByEmail(ctx context.Context, entity *model.User) (int64, error) {
	var total int64
	DB := u.db.WithContext(ctx)

	// SELECT count(*) FROM "users" WHERE "users"."email" = ?
	if err := DB.Model(model.User{}).Where(model.User{Email: entity.Email}).Count(&total).Error; err != nil {
		return 0, err
	}
	return total, nil
}

func (u *userPostgresRepository) FindUsers(ctx context.Context, offset, limit int) ([]*model.User, int, error) {
	var users []*model.User
	var total int64

	DB := u.db.WithContext(ctx)

	if err := DB.Model(&model.User{}).Where("role = ?", "user").Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := DB.Where("role = ?", "user").Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		return nil, 0, err
	}

	return users, int(total), nil
}

func (u *userPostgresRepository) UpdateAvatarUser(ctx context.Context, id, avatar string) error {
	DB := u.db.WithContext(ctx)
	if err := DB.Model(model.User{}).Where("id = ?", id).Update("avatar", avatar).Error; err != nil {
		return err
	}

	return nil
}
