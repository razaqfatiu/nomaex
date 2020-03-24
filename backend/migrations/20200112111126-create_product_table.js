/* eslint-disable no-unused-vars */
// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productPrice: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    unit: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'categories',
        key: 'categoryId',
      },
    },
    uploadedBy: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'userId',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
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

  // eslint-disable-next-line arrow-body-style
  down: (queryInterface, Sequelize) => queryInterface.dropTable('products'),
};
