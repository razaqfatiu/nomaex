'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const hashedPassword1 = process.env.ADMIN_PASSWORD1
const hashedPassword2 = process.env.ADMIN_PASSWORD2

async function hash(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const p1 = await hash(hashedPassword1)
    const p2 = await hash(hashedPassword2)
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        lastName: 'Nomaex',
        email: 'adminNomaex@gmail.com',
        address1: 'Lagos',
        address2: 'Abuja',
        state: 'Lagos',
        phoneNumber: '08142396523',
        password: p1,
        isActive: true,
        isAdmin: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Fatiu',
        lastName: 'Admin',
        email: 'muhfatiu@gmail.com',
        address1: 'Lagos',
        address2: 'Abuja',
        state: 'Lagos',
        phoneNumber: '08142396523',
        password: p2,
        isActive: true,
        isAdmin: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
