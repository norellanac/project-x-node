'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductService.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    specialPrice: DataTypes.FLOAT,
    location: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductService',
  });
  return ProductService;
};