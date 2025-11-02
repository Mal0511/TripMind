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
    await queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,          // cần có userId = 1 trong bảng Users
        tripId: 1,          // cần có tripId = 1 trong bảng Trips
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        tripId: 2,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        tripId: 3,
        status: 'cancelled',
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
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
