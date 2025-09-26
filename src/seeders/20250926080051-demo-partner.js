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
    await queryInterface.bulkInsert('Partners', [
      {
        companyName: 'Travel Co Ltd',
        email: 'contact@travelco.com',
        password: 'partner123',
        phone: '0934567890',
        address: '123 Nguyen Trai, Ha Noi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: 'Explore Vietnam JSC',
        email: 'info@explorevn.com',
        password: 'explorevn456',
        phone: '0945678901',
        address: '456 Le Loi, Ho Chi Minh City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyName: 'Adventure Asia',
        email: 'hello@adventureasia.com',
        password: 'adventure789',
        phone: '0956789012',
        address: '789 Tran Phu, Da Nang',
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
    return queryInterface.bulkDelete('Partners', null, {});
  }
};
