'use strict';

const statuses = [
  {status: 'success', label: 'Success'},
  {status: 'cancel', label: 'Cancel'},
  {status: 'completed', label: 'Completed'},
  {status: 'awaiting_pickup', label: 'Awaiting Pick-up'},
  {status: 'pending_payment', label: 'Pending Payment'},
];
const arr = [];
let status;
let id = 1
for (stat of statuses) {
  arr.push({ status: stat.status, label: stat.label, orderStatusId: id, createdAt: new Date() });
  id++
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('order_statuses', arr, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('order_statuses', null, {})
};
