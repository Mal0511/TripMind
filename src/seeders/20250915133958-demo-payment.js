'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Payments', [
      {
        bookingId: 1, // tham chiếu đến Booking có id = 1
        amount: 200.50,
        payment_method: 'Credit Card',
        status: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payments', null, {});
  }
};
