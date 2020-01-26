/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
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
  }),
  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('orders', 'orders_ibfk_1');
    queryInterface.removeConstraint('orders', 'orders_ibfk_2');
    return queryInterface.dropTable('orders');
  },
};
