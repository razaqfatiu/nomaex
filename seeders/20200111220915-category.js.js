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
let id = 1
for (category of categories) {
  arr.push({ value: category, categoryId: id, createdAt: new Date() });
  id++
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', arr, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', null, {}),
};
