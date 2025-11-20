'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Partner.init({
    companyName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    serviceType: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    rating: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Partner',
  });
  return Partner;
};