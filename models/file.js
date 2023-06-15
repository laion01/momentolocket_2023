'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log("models list------------------------------", models);

      File.belongsTo(models.Product, {
        foreignKey: {
          name: 'productId',
        }
      })
    }
  }
  File.init({
    pathname: DataTypes.STRING,
    type: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};


// pathname: {
// type: {
// productId: {
// width: {
// height: {