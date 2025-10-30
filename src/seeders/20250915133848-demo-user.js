'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'John',
        email: 'example@example.com',
        password: '123456',
        phone: '0905123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active',
        userrole: 'Staff_support',
      },
      {
        username: 'Nam',
        email: 'leanhnam@dtu.edu.vn',
        password: '1234567',
        phone: '0334234567',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active',
        userrole: 'Basic',
      },
      {
        username: 'Lê',
        email: 'le@dtu.edu.vn',
        password: '12345',
        phone: '0283456789',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active',
        userrole: 'Premium',
      },
      {
        username: 'Long',
        email: 'long@dtu.edu.vn',
        password: '55555',
        phone: '0345678901',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active',
        userrole: 'Partner',
      },
      {
        username: 'Nhật',
        email: 'nhat@dtu.edu.vn',
        password: '66666',
        phone: '0434567890',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Active',
        userrole: 'Basic',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
