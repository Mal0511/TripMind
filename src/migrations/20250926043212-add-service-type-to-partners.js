'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Partners', 'serviceType', {
      type: Sequelize.ENUM('hotel', 'restaurant', 'transport', 'attraction'),
      allowNull: false,
      defaultValue: 'hotel'
    });
    
    await queryInterface.addColumn('Partners', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
    await queryInterface.addColumn('Partners', 'status', {
      type: Sequelize.ENUM('active', 'inactive', 'pending'),
      allowNull: false,
      defaultValue: 'pending'
    });
    
    await queryInterface.addColumn('Partners', 'rating', {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.00
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Partners', 'rating');
    await queryInterface.removeColumn('Partners', 'status');
    await queryInterface.removeColumn('Partners', 'description');
    await queryInterface.removeColumn('Partners', 'serviceType');
  }
};
