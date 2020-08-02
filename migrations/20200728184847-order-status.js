'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderStatus', {
    orderStatusId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false
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
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderStatus'),
};
