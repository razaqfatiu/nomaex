'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Carts', {
    cartId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Products',
        key: 'productId',
      },
    },
    customerId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'userId',
      },
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    checkedOut: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Carts'),

};
