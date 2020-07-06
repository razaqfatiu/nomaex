// /* eslint-disable no-unused-vars */
'use strict';

module.exports = (sequelize, DataTypes) => {
const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'productId',
    },
    onDelete: 'CASCADE',
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'userId',
    },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {});

Order.associate = (models) => {
  models.Order.belongsTo(models.Product, { foreignKey: 'orderId' });
  models.Order.belongsTo(models.User, { foreignKey: 'orderId' });
};
  return Order
}
