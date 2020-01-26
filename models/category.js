/* eslint-disable no-unused-vars */
const db = require('./index');
const Product = require('./product');

// const { sequelize, Sequelize } = db;
const { sequelize, Sequelize } = require('./connection');


const category = sequelize.define('category', {
  categoryId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
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
    type: Sequelize.DATE,
    defaultValue: null,
  },
}, {});
category.associate = (models) => {
  category.hasMany(Product, { foreignKey: 'products_ibfk_1' });
};

module.exports = category;
