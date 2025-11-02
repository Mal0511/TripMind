// Định nghĩa model Partner cho quản lý đối tác
// Bao gồm các trường: companyName, email, phone, address, serviceType, description, status, rating
// Liên kết với Trip và Booking
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Partner.hasMany(models.Trip, { foreignKey: 'partnerId' });


    }
  }
  // Khai báo các cột trong bảng Partner
  Partner.init(
    {
      companyName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      serviceType: {
        type: DataTypes.ENUM("Hotel", "Restaurant", "Transport", "Attraction"),
        allowNull: false, 
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM("Active", "Inactive", "Pending"),
        defaultValue: "Pending",// Mặc định khi tạo mới sẽ là "Pending"
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: "Partner",
    }
  );
  return Partner;
};
