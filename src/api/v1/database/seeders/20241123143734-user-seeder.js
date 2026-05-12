'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('123123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Rolando',
        lastname: 'Orellana',
        email: 'orellana.marketing@gmail.com',
        password: hashedPassword,
        averageRating: 4.5,
        avatarUrl: 'https://picsum.photos/50/50?random=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Andrea',
        lastname: 'Alvanes',
        email: 'alvanesc@gmail.com',
        password: hashedPassword,
        averageRating: 4.0,
        avatarUrl: 'https://picsum.photos/50/50?random=2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Allan',
        lastname: 'Orellana',
        email: 'aforellanar@gmail.com',
        password: hashedPassword,
        averageRating: 4.2,
        avatarUrl: 'https://picsum.photos/50/50?random=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alexis',
        lastname: 'Orellana',
        email: '1005alexis@gmail.com',
        password: hashedPassword,
        phone: '+50233120413',
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