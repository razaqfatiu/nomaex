/* eslint-disable no-unused-vars */
// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
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
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    productPrice: {
      type: Sequelize.INTEGER,
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
        model: 'Categories',
        key: 'categoryId',
      },
    },
    uploadedBy: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Products'),
};
