'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verify_order_payments', {
      verifyOrderPaymentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'orderId',
        },
        onDelete: 'CASCADE',
      },
      orderPaymentInitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order_payment_inits',
          key: 'orderPaymentInitId',
        },
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      metadata: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gateway_response: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,

      },
      channel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('verify_order_payments');
  }
};