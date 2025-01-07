'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    unique_id: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
      type: DataTypes.STRING, 
      defaultValue: 'offline'
    },
    img_profile: {
      type: DataTypes.STRING, 
      defaultValue: 'default.png'
    },
    birth_date: DataTypes.STRING,
    birth_place: DataTypes.STRING,
    about: DataTypes.STRING,
    company: DataTypes.STRING,
    job: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    web_link: DataTypes.STRING,
    github_link: DataTypes.STRING,
    fb_link: DataTypes.STRING,
    ig_link: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false
    },
    remember_token: DataTypes.TEXT,
    emailToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};