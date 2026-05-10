'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
      { name: 'create_product_service', description: 'Create Product Service', createdAt: new Date(), updatedAt: new Date() },
      { name: 'update_product_service', description: 'Update Product Service', createdAt: new Date(), updatedAt: new Date() },
      { name: 'delete_product_service', description: 'Delete Product Service', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};