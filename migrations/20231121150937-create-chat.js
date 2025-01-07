'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_unique_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      members: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      friend_req: {
        allowNull: true,
        type: Sequelize.STRING
      },
      friend: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      last_message: {
        allowNull: true,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Chats');
  }
};