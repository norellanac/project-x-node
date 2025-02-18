'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      { name: 'Admin', description: 'Administrator', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User', description: 'Regular User', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Merchant', description: 'Merchant User', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};