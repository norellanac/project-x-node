'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('123123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
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
        password: hashedPassword,
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
        password: hashedPassword,
        role: '3',
        averageRating: 4.2,
        avatarUrl: 'https://picsum.photos/50/50?random=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'My',
        lastname: 'Test',
        email: '1005alexis@gmail.com',
        password: hashedPassword,
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