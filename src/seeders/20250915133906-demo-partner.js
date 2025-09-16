'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Partners', [
      {
        companyName: 'Xhome',
        email: 'example@example.com',
        password: '123456',
        address: '32 Chu Van An',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Partners', null, {});
  }
};
