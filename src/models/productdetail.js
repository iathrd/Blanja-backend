'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      ProductDetail.belongsTo(models.Color, {
        primaryKey: 'colorId',
        as: 'color'
      })
      ProductDetail.belongsTo(models.Size, {
        primaryKey: 'sizeId',
        as: 'size'
      })
    }
  };
  ProductDetail.init({
    colorId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER,
    promoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductDetail'
  })
  return ProductDetail
}
