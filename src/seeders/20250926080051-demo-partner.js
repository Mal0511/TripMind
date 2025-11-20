'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Partners', [
      {
        companyName: 'Hotel Paradise',
        email: 'hotelparadise@gmail.com',
        password: '123456',
        phone: '0912345678',
        address: '123 Main St',
        serviceType: 'Hotel',
        description: 'Khách sạn 5 sao',
        status: 'Active',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: 'Fast Transport',
        email: 'fasttransport@gmail.com',
        password: '123456',
        phone: '0987654321',
        address: '456 Market St',
        serviceType: 'Transport',
        description: 'Dịch vụ vận chuyển nhanh',
        status: 'Active',
        rating: 4.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Partners', null, {});
  }
};
