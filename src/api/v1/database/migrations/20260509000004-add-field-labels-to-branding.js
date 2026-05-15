'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Brandings', 'fieldLabels', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Brandings', 'fieldLabels');
  },
};
