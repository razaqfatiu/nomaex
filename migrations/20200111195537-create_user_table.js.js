/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jobRole: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
