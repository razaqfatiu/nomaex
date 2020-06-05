/* eslint-disable no-unused-vars */

const categories = [
  'Animal',
  'Farm-tool',
  'Fishery',
  'Fruit',
  'Grain',
  'Other',
  'Poultry',
  'Service',
  'Tuber',
  'Vegetable',
];
const arr = [];
let category;

for (category of categories) {
  arr.push({ value: category });
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', arr, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', null, {}),
};
