'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Brandings', 'introSlides', {
      type: Sequelize.JSON,
      defaultValue: [],
    });
    await queryInterface.addColumn('Brandings', 'appStoreUrl', {
      type: Sequelize.STRING,
      defaultValue: '',
    });
    await queryInterface.addColumn('Brandings', 'playStoreUrl', {
      type: Sequelize.STRING,
      defaultValue: '',
    });
  },

  down: async (queryInterface) => {
    // Using raw queries to avoid Sequelize MariaDB/MySQL removeColumn bug
    // Wrapped in try-catches to handle cases where columns might already be gone
    const columns = ['introSlides', 'appStoreUrl', 'playStoreUrl'];
    
    for (const column of columns) {
      try {
        await queryInterface.sequelize.query(`ALTER TABLE \`Brandings\` DROP COLUMN \`${column}\`;`);
      } catch (error) {
        if (error.parent && error.parent.errno === 1091) {
          console.log(`Column "${column}" already dropped from "Brandings" table.`);
        } else {
          throw error;
        }
      }
    }
  },
};
