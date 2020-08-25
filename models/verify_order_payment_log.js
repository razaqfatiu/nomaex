'use strict';
module.exports = (sequelize, DataTypes) => {
  const verify_order_payment_log = sequelize.define('verify_order_payment_log', {
    verifyOrderPaymentLogId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    verifyOrderPaymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'verify_order_payments',
        key: 'verifyOrderPaymentId',
      },
      onDelete: 'CASCADE',
    },
    log: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('log'));
      },
      set: function (val) {
        return this.setDataValue('log', JSON.stringify(val));
      },
    },
    fees: {
      type: DataTypes.STRING,
    },
    authorization: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('authorization'));
      },
      set: function (val) {
        return this.setDataValue('authorization', JSON.stringify(val));
      },
    },
    customer: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('customer'));
      },
      set: function (val) {
        return this.setDataValue('customer', JSON.stringify(val));
      },
    },
    plan: {
      type: DataTypes.STRING,
    },
    requested_amount: {
      type: DataTypes.STRING
    }
  }, {});
  verify_order_payment_log.associate = function (models) {
    // associations can be defined here
    models.verify_order_payment_log.belongsTo(models.verify_order_payment,
      { foreignKey: 'verifyOrderPaymentId' });
  };
  return verify_order_payment_log;
};