"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addusers_role = [
      {
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("User_roles", addusers_role, {});
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User_roles", null, {});
  },
};
