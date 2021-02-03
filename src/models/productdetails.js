'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductDetails.init({
    productId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    SizeId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    promoId: DataTypes.INTEGER,
    image: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDetails',
  });
  return ProductDetails;
};