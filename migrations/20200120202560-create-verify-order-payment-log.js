'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verify_order_payment_logs', {
      verify_order_payment_log_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      verifyOrderPaymentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'verify_order_payments',
          key: 'verifyOrderPaymentId',
        },
        onDelete: 'CASCADE',
      },
      log: {
        type: Sequelize.STRING,
        get: function () {
          return JSON.parse(this.getDataValue('log'));
        },
        set: function (val) {
          return this.setDataValue('log', JSON.stringify(val));
        },
      },
      fees: {
        type: Sequelize.STRING,
      },
      authorization: {
        type: Sequelize.STRING,
        get: function () {
          return JSON.parse(this.getDataValue('authorization'));
        },
        set: function (val) {
          return this.setDataValue('authorization', JSON.stringify(val));
        },
      },
      customer: {
        type: Sequelize.STRING,
        get: function () {
          return JSON.parse(this.getDataValue('customer'));
        },
        set: function (val) {
          return this.setDataValue('customer', JSON.stringify(val));
        },
      },
      plan: {
        type: Sequelize.STRING,
      },
      requested_amount: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('verify_order_payment_logs');
  }
};