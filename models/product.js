/* eslint-disable no-unused-vars */
require('dotenv').config();
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(`mysql://${process.env.dbUser}:${process.env.dbPassword}@${process.env.dbHost}/${process.env.dbName}`);
// const db = require('./index');
const category = require('./category');
const User = require('./user-account');

// const sequelize = require('./index');
// const Sequelize = require('./index');

// const { sequelize, Sequelize } = require('./index');
const { sequelize, Sequelize } = require('./connection');

const Product = sequelize.define('product', {
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productPrice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  unit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'categories',
      key: 'categoryId',
    },
    onDelete: 'CASCADE',
  },
  uploadedBy: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'userId',
    },
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE,
    defaultValue: null,
  },
}, {});
Product.associate = (models) => {
  // associations can be defined here
  Product.belongsTo(models.category, { foreignKey: 'products_ibfk_1' });
  Product.belongsTo(models.User, { foreignKey: 'products_ibfk_2' });
  Product.hasMany(models.productImage, { foreignKey: 'product-images_ibfk_1' });
};
//   return Product;
// };
module.exports = Product;
