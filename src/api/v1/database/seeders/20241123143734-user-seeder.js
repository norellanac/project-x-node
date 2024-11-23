'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        lastname: 'Doe',
        email: '1005alexis@gmail,com',
        password: 'hashedpassword1', // Make sure to hash the password in a real application
        role: '1',
        averageRating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        password: 'hashedpassword2', // Make sure to hash the password in a real application
        role: '2',
        averageRating: 4.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alice',
        lastname: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'hashedpassword3', // Make sure to hash the password in a real application
        role: '3',
        averageRating: 4.2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};