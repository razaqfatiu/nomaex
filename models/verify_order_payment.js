'use strict';
module.exports = (sequelize, DataTypes) => {
  const verify_order_payment = sequelize.define('verify_order_payment', {
    verifyOrderPaymentId: {
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
    orderPaymentInitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_payment_inits',
        key: 'orderPaymentInitId',
      },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    metadata: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gateway_response: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,

    },
    channel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {});
  verify_order_payment.associate = function (models) {
    // associations can be defined here
    models.verify_order_payment.belongsTo(models.order, {
      // as: 'users',
      foreignKey: 'orderId'
    });
    models.verify_order_payment.belongsTo(models.order_payment_init, {
      // as: 'users',
      foreignKey: 'orderPaymentInitId'
    });
    models.verify_order_payment.hasOne(models.verify_order_payment_log, {
      // as: 'users',
      foreignKey: 'verifyOrderPaymentId'
    });
  };
  return verify_order_payment;
};