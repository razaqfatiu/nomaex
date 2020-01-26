const { sequelize, Sequelize } = require('./connection');

const User = sequelize.define('user', {
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
}, {});
User.associate = (models) => {
  // associations can be defined here
  User.hasMany(models.Product, { foreignKey: 'products_ibfk_2' });
  User.hasMany(models.Order, { foreignKey: 'orderId' });
};

module.exports = User;
