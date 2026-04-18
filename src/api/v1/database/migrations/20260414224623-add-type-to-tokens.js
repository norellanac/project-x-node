'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tokens', 'type', {
      type: Sequelize.ENUM('ACCESS', 'REFRESH', 'PASSWORD_RESET'),
      allowNull: false,
      defaultValue: 'ACCESS'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tokens', 'type');
    // Note: Dropping the ENUM type might be database-specific if needed
  }
};
