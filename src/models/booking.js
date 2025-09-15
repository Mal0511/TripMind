'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasMany(models.Payment, { foreignKey: 'bookingId' });
      User.belongsTo(models.Booking, { foreignKey: 'userId' });
      Partner.belongsTo(models.Booking, { foreignKey: 'partnerId' });
    }
  };
  Booking.init({
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};