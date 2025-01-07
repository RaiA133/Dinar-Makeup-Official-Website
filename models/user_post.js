'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_posts.belongsTo(models.User, { as: 'user', foreignKey: 'unique_id', hooks: true });
    }
  }
  User_posts.init({
    unique_id: DataTypes.STRING,
    slug: DataTypes.TEXT,
    post_img: {
      type: DataTypes.STRING, 
      defaultValue: 'default.png'
    },
    post_title: DataTypes.STRING,
    post_desc: DataTypes.TEXT,
    post_category: DataTypes.STRING,
    post_tags: DataTypes.STRING,
    min_price: DataTypes.STRING,
    max_price: DataTypes.STRING,
    post_worktime: DataTypes.STRING,
    skills: DataTypes.ARRAY(DataTypes.STRING),
    post_expired_in: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User_post',
  });
  return User_posts;
};