/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },

  },
    {
      // indexes: [
      //   {
      //       unique: true,
      //       fields: ['value']
      //   }
      // ]
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Categories'),
};
