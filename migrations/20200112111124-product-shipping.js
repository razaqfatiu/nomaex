'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProductShippings', {
    productShippingId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cost: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    eta: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ProductShippings'),
};
