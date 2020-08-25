'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_payment_init = sequelize.define('order_payment_init', {
    orderPaymentInitId: {
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
    authorization_url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    access_code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    reference: {
      allowNull: false,
      type: DataTypes.STRING
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
  order_payment_init.associate = function (models) {
    // associations can be defined here
    models.order_payment_init.belongsTo(models.User, { foreignKey: 'customerId' });

    models.order_payment_init.belongsTo(models.order, {
      // as: 'users',
      foreignKey: 'orderId'
    });
    models.order_payment_init.hasOne(models.verify_order_payment, {
      // as: 'users',
      foreignKey: 'orderPaymentInitId'
    });
  };
  return order_payment_init;
};