"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Nguyen Van A",
          username: "nguyenvana",
          email: "a@gmail.com",
          password: "123456",
          status: "Active",
          role: "user",
          phone: "0901234567",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Tran Thi B",
          username: "tranthib",
          email: "b@gmail.com",
          password: "123456",
          status: "Active",
          role: "user",
          phone: "0907654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
