'use strict';

const { url } = require("inspector");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        password: 'hashedpassword1', // Make sure to hash the password in a real application
        role: '1',
        averageRating: 4.5,
        avatarUrl: 'https://picsum.photos/50/50?random=1',
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
        avatarUrl: 'https://picsum.photos/50/50?random=2',
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
        avatarUrl: 'https://picsum.photos/50/50?random=3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};