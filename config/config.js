require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    username: process.env.dbUser || 'root',
    password: process.env.dbPassword || null,
    database: process.env.dbName || 'development',
    host: process.env.dbHost || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  production: {
    username: process.env.dbUser || 'root',
    password: process.env.dbPassword || null,
    database: process.env.dbName || 'development',
    host: process.env.dbHost || '127.0.0.1',
    port:  process.env.dbPort || 5400,
    dialect: 'postgres',
    operatorsAliases: 0,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
   },
  },
};
