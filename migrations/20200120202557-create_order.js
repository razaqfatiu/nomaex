/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    orderId: {
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
    status: {
      type: Sequelize.BOOLEAN,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Orders'),
};
