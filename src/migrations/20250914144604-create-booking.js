'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',   // tên bảng bạn muốn tham chiếu
          key: 'id'            // cột id trong bảng User
        },
        onUpdate: 'CASCADE',   // nếu id User thay đổi thì update theo
        onDelete: 'CASCADE'    // nếu User bị xóa thì booking cũng bị xóa
      },
      tripId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trip',   // tên bảng bạn muốn tham chiếu
          key: 'id'            // cột id trong bảng Trip
        },
        onUpdate: 'CASCADE',   // nếu id Trip thay đổi thì update theo
        onDelete: 'CASCADE'    // nếu Trip bị xóa thì booking cũng bị xóa
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};