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
    // Using raw query to avoid Sequelize MariaDB/MySQL removeColumn bug
    // Wrapped in try-catch to handle cases where the column might already be gone
    try {
      await queryInterface.sequelize.query('ALTER TABLE `Tokens` DROP COLUMN `type`;');
    } catch (error) {
      if (error.parent && error.parent.errno === 1091) {
        console.log('Column "type" already dropped from "Tokens" table.');
      } else {
        throw error;
      }
    }
  }
};
