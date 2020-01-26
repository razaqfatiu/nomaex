require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.dbName, process.env.dbUser, process.env.dbPassword, {
  host: process.env.dbHost,
  dialect: 'mysql',
  port: 3306,
});

module.exports = {
  Sequelize, sequelize,
};
