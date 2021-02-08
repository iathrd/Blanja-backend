'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Product.belongsTo(models.ProductDetail, {
        primaryKey: 'detailId',
        as: 'detail'
      })
      Product.hasMany(models.ProductImage, {
        primaryKey: 'productId',
        as: 'images'
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    detailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product'
  })
  return Product
}
