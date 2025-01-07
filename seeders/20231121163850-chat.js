'use strict';
const { uniqueId } = require('./factory/uniqueId');
const users = uniqueId();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const addChat = [
      {
        chat_unique_id: "ad58359a-8fcf-457f-8636-28b1feb2cba4", // unique_id obroran ini
        members: [users.user1, users.user6], // obrolan rai dan sarah
        friend: true,
        last_message: 'pesan terakhir rai ke sarah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chat_unique_id: "asd1-dsa",
        members: [users.user1, users.user2],
        friend: true,
        last_message: 'hallo bang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chat_unique_id: "asd2-asd",
        members: [users.user2, users.user3],
        friend: true,
        last_message: 'paling di kirim lewat email',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chat_unique_id: "asd3-dsa",
        members: [users.user3, users.user1],
        friend: false,
        last_message: 'hai ini siapa ??',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("Chats", addChat, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Chats", null, {});
  }
};
