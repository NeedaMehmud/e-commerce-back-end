// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
const { Category } = require('.');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    //==== Doesn't allow null value. Set as primary key. Uses auto increment. ====//
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //==== Product name needs to be a string. Doesn't allow null values. ====//
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //==== Decimal. Doesn't allow null values. Validates that the value is a decimal. ====//
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    //==== Integer. Doesn't allow null values. Set a default value of `10`. Validates that the value is numeric. ====//
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true, 
      }
    },
    //====    * Integer. References the `Category` model's `id`. ====//
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
