'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Trip.belongsTo(models.Partner, { foreignKey: 'partnerId' });
      Trip.hasMany(models.Booking, { foreignKey: 'tripId' });
    }
    getDays() {
      if (this.start_date && this.end_date) {
        const diffTime = Math.abs(this.end_date - this.start_date);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      return null;

    }
  };
  Trip.init({
    partnerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};