'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Plomero',
        description: 'Reparación de tuberías',
        icon: 'https://picsum.photos/50/50?random=1',
        image: 'https://picsum.photos/300/200?random=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Electricista',
        description: 'Instalación eléctrica',
        icon: 'https://picsum.photos/50/50?random=2',
        image: 'https://picsum.photos/300/200?random=2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carpintero',
        description: 'Restauración de muebles',
        icon: 'https://picsum.photos/50/50?random=3',
        image: 'https://picsum.photos/300/200?random=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pintor',
        description: 'Pintura interior y exterior',
        icon: 'https://picsum.photos/50/50?random=4',
        image: 'https://picsum.photos/300/200?random=4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jardinero',
        description: 'Diseño y mantenimiento de jardines',
        icon: 'https://picsum.photos/50/50?random=5',
        image: 'https://picsum.photos/300/200?random=5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fontanero',
        description: 'Desatascos y mantenimiento de sistemas de agua',
        icon: 'https://picsum.photos/50/50?random=6',
        image: 'https://picsum.photos/300/200?random=6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cerrajero',
        description: 'Apertura de puertas e instalación de cerraduras',
        icon: 'https://picsum.photos/50/50?random=7',
        image: 'https://picsum.photos/300/200?random=7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Técnico de Aire Acondicionado',
        description: 'Instalación y mantenimiento de equipos de aire acondicionado',
        icon: 'https://picsum.photos/50/50?random=8',
        image: 'https://picsum.photos/300/200?random=8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Limpiador',
        description: 'Limpieza de casas y oficinas',
        icon: 'https://picsum.photos/50/50?random=9',
        image: 'https://picsum.photos/300/200?random=9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Diseño Gráfico',
        description: 'Diseño de logotipos y branding',
        icon: 'https://picsum.photos/50/50?random=10',
        image: 'https://picsum.photos/300/200?random=10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};