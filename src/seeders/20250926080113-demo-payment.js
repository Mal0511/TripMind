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
    await queryInterface.bulkInsert('Payments', [
      {
        bookingId: 1,
        amount: 150.00,
        payment_method: 'credit_card',
        status: 'paid',
        paid_at: new Date('2025-10-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookingId: 2,
        amount: 200.00,
        payment_method: 'paypal',
        status: 'pending',
        paid_at: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bookingId: 3,
        amount: 300.00,
        payment_method: 'cash',
        status: 'paid',
        paid_at: new Date('2025-12-21'),
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
    return queryInterface.bulkDelete('Payments', null, {});
  }
};
