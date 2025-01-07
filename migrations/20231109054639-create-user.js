"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      no: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      id: { // mau bagaimanapun foreign key akan tetap mengambil data kesini, 
        allowNull: true,
        unique: true,
        primaryKey: true,
        // autoIncrement: true,
        type: Sequelize.STRING
      },
      unique_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      user_role_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        unique: true, 
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validasi bahwa nilainya harus berupa alamat email
        },
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },

      img_profile: {
        allowNull: true,
        type: Sequelize.STRING
      },
      birth_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      birth_place: {
        allowNull: true,
        type: Sequelize.STRING
      },
      about: {
        allowNull: true,
        type: Sequelize.STRING
      },
      company: {
        allowNull: true,
        type: Sequelize.STRING
      },
      job: {
        allowNull: true,
        type: Sequelize.STRING
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      contact: {
        allowNull: true,
        type: Sequelize.STRING
      },
      web_link: {
        allowNull: true,
        type: Sequelize.STRING
      },
      github_link: {
        allowNull: true,
        type: Sequelize.STRING
      },
      fb_link: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ig_link: {
        allowNull: true,
        type: Sequelize.STRING
      },

      isVerified: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      remember_token: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      emailToken: {
        allowNull: true,
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
