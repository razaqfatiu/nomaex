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
      type: Sequelize.TEXT,
      allowNull: false,
    },
    productPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productDiscount: {
      type: Sequelize.DECIMAL,
      defaultValue: 0.00,
      allowNull: false
    },
    productShipping: {
      type: Sequelize.INTEGER,
      references: {
        model: 'ProductShippings',
        key: 'productShippingId',
      },
      onDelete: 'CASCADE',
    },
    unit: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    category: {
      // primaryKey: true,
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

  // eslint-disable-next-line arrow-body-style
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Products'),
};
