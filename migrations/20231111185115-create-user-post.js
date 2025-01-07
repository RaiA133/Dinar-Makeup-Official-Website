'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "unique_id"
        }
      },
      slug: {
        allowNull: true,
        unique:true,
        type: Sequelize.TEXT
      },
      post_img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      post_title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      post_desc: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      post_category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      post_tags: {
        allowNull: true,
        type: Sequelize.STRING
      },
      min_price: {
        allowNull: true,
        type: Sequelize.STRING
      },
      max_price: {
        allowNull: true,
        type: Sequelize.STRING
      },
      post_worktime: {
        allowNull: true,
        type: Sequelize.STRING
      },
      skills: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      post_expired_in: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_posts');
  }
};