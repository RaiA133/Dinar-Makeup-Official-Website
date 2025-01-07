'use strict';
const { uniqueId } = require('./factory/uniqueId');
const users = uniqueId();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const addMessage = [
      {
        chat_unique_id: "ad58359a-8fcf-457f-8636-28b1feb2cba4", // obrolan rai ke sarah
        sender_unique_id: users.user1, // dari rai (unique_id rai)
        text: 'pesan pertama rai ke sarah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chat_unique_id: "asd1-dsa", // obroran rai ke ikhsan
        sender_unique_id: users.user1,// dari rai
        text: 'hallo bang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("Messages", addMessage, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Messages", null, {});
  }
};
