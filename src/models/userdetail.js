'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  UserDetail.init({
    userId: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    birtDay: DataTypes.DATE,
    storeName: DataTypes.STRING,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail'
  })
  return UserDetail
}
