'use strict';

const statuses = [
  { status: 'success', label: 'Success' },
  { status: 'cancel', label: 'Cancel' },
  { status: 'awaiting_payment', label: 'Awaiting Payment' },
  { status: 'payment_completed', label: 'Payment Completed' },
  { status: 'awaiting_delivery', label: 'Awaiting Delivery/Pick-up' },
  { status: 'completed', label: 'Completed' },
];
const arr = [];
let status;
let id = 1
for (let stat of statuses) {
  arr.push({ status: stat.status, label: stat.label, orderStatusId: id, createdAt: new Date() });
  id++
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('order_statuses', arr, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('order_statuses', null, {})
};
