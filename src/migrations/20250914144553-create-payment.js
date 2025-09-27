"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookingId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Booking", // tên bảng bạn muốn tham chiếu
          key: "id", // cột id trong bảng Booking
        },
        onUpdate: "CASCADE", // nếu id Booking thay đổi thì update theo
        onDelete: "CASCADE", // nếu Booking bị xóa thì Payment cũng bị xóa
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      paid_at: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Payments");
  },
};
