'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Trips', [
      {
        partnerId: 1,  
        title: 'Tour Hà Nội - Hạ Long',
        description: 'Chuyến đi tham quan vịnh Hạ Long trong 3 ngày 2 đêm',
        start_location: 'Hà Nội',
        end_location: 'Hạ Long',
        start_date: new Date('2025-10-01'),
        end_date: new Date('2025-10-03'),
        price: 200.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Trips', null, {});
  }
};
