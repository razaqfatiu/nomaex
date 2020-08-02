// /* eslint-disable no-unused-vars */
'use strict';

module.exports = (sequelize, DataTypes) => {
const OrderStatus = sequelize.define('OrderStatus', {
  orderStatusId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW(),
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {});

OrderStatus.associate = (models) => {
  // models..belongsTo(models.Order, { foreignKey: 'orderStatusId' });
  models.OrderStatus.hasOne(models.Order,
    {
      as: 'orderStatus',
      foreignKey: 'status',
      // foreignKey: {
      //   allowNull: false
      // }
    });
  };
  return OrderStatus
}
