/* eslint-disable no-unused-vars */
// 'use strict';

const { Sequelize, sequelize } = require('./connection');

const Order = sequelize.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'productId',
    },
    onDelete: 'CASCADE',
  },
  customerId: {
    allowNull: false,
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
    type: Sequelize.DATE,
    defaultValue: null,
  },
}, {});

Order.associate = (models) => {
  // associations can be defined here
  Order.belongsTo(models.Product, { foreignKey: 'orders_ibfk_1' });
  Order.belongsTo(models.User, { foreignKey: 'orders_ibfk_2' });
};

module.exports = Order;
