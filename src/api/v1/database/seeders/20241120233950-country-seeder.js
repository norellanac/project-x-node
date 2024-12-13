'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', [
      {
        id: 1,
        name: 'Guatemala',
        urlImage: '',
        createdAt: '2019-09-05 00:21:37',
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Countries', { id: 1 }, {});
  }
};