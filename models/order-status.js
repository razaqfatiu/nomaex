// /* eslint-disable no-unused-vars */
'use strict';

module.exports = (sequelize, DataTypes) => {
const order_status = sequelize.define('order_status', {
  orderStatusId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
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

order_status.associate = (models) => {
  models.order_status.hasOne(models.order,
    {
      as: 'orderStatus',
      foreignKey: 'status',
      // foreignKey: {
      //   allowNull: false
      // }
    });
  };
  return order_status
}
