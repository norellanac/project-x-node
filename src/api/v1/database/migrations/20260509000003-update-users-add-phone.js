'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make email nullable (remove NOT NULL constraint, keep unique)
    await queryInterface.sequelize.query(
      'ALTER TABLE `Users` MODIFY COLUMN `email` VARCHAR(255) NULL;'
    );
    // Add phone column (nullable, unique — MariaDB allows multiple NULLs in unique index)
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'email',
    });
    // Add unique index on phone separately (allows NULL)
    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX `users_phone_unique` ON `Users` (`phone`);'
    );
    // Make name and lastname explicitly nullable (they already were, this is for clarity)
    await queryInterface.sequelize.query(
      'ALTER TABLE `Users` MODIFY COLUMN `name` VARCHAR(255) NULL;'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE `Users` MODIFY COLUMN `lastname` VARCHAR(255) NULL;'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS `users_phone_unique` ON `Users`;'
    );
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.sequelize.query(
      'ALTER TABLE `Users` MODIFY COLUMN `email` VARCHAR(255) NOT NULL;'
    );
  },
};
