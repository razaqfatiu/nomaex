require('dotenv').config();

module.exports = {
  development: {
    username: process.env.dbUser || 'root',
    password: process.env.dbPassword || null,
    database: process.env.dbName || 'development',
    host: process.env.dbHost || '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
  },
};
