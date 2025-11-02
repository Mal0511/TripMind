'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Payment.belongsTo(models.Booking, { foreignKey: 'bookingId' });

    }
  };
  Payment.init({
    bookingId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    payment_method: DataTypes.STRING,
    status: DataTypes.STRING,
    paid_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};