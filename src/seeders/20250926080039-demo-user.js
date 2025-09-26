'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Nguyen Van A',
        userName: 'nguyenvana',
        email: 'vana@example.com',
        password: '123456',
        phone: '0901234567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Tran Thi B',
        userName: 'tranthib',
        email: 'thib@example.com',
        password: 'abcdef',
        phone: '0912345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Le Van C',
        userName: 'levanc',
        email: 'vanc@example.com',
        password: 'qwerty',
        phone: '0923456789',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
