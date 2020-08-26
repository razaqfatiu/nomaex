'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipping_info = sequelize.define('shipping_info', {
    shippingInfoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'orderId',
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  shipping_info.associate = function (models) {
    // associations can be defined here
    models.shipping_info.belongsTo(models.User, { foreignKey: 'customerId' });
    models.shipping_info.belongsTo(models.order, {
      // as: 'users',
      foreignKey: 'orderId'
    });
  };
  return shipping_info;
};