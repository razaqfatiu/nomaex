/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
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
    address1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
