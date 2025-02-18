'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Construcción y Obras',
        description: 'Contratistas, arquitectos, ingenieros, albañiles',
        icon: 'https://picsum.photos/50/50?random=1',
        urlImage: 'https://picsum.photos/300/200?random=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnicos Industriales',
        description: 'Electricistas, plomeros, soldadores, carpinteros',
        icon: 'https://picsum.photos/50/50?random=2',
        urlImage: 'https://picsum.photos/300/200?random=2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vehiculos y Transporte',
        description: 'Mecánicos, elecromecánicos, pilotos, gruas y más',
        icon: 'https://picsum.photos/50/50?random=3',
        urlImage: 'https://picsum.photos/300/200?random=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mantenimiento',
        description: 'Mantenimiento de casas, edificios y oficinas',
        icon: 'https://picsum.photos/50/50?random=4',
        urlImage: 'https://picsum.photos/300/200?random=4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Profesionales del Hogar',
        description: 'Jaridnería, limpieza, plomería, cerrajería',
        icon: 'https://picsum.photos/50/50?random=5',
        urlImage: 'https://picsum.photos/300/200?random=5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnología y Electrónica',
        description: 'Reparación de computadoras, celulares, televisores',
        icon: 'https://picsum.photos/50/50?random=6',
        urlImage: 'https://picsum.photos/300/200?random=6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salud y Belleza',
        description : 'Médicos, dentistas, estilistas, masajistas',
        icon: 'https://picsum.photos/50/50?random=7',
        urlImage: 'https://picsum.photos/300/200?random=7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eventos y Entretenimiento',
        description: 'Organizadores de eventos, payasos, músicos, magos',
        icon: 'https://picsum.photos/50/50?random=8',
        urlImage: 'https://picsum.photos/300/200?random=8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Educación y Formación',
        description: 'Profesores, tutores, traductores, instructores',
        icon: 'https://picsum.photos/50/50?random=9',
        urlImage: 'https://picsum.photos/300/200?random=9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asesoria Legal',
        description: 'Abogados, notarios, mediadores, gestores',
        icon: 'https://picsum.photos/50/50?random=10',
        urlImage: 'https://picsum.photos/300/200?random=10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Servicios de Reparación',
        description: 'Reparación de electrodomésticos, muebles, ropa',
        icon: 'https://picsum.photos/50/50?random=14',
        urlImage: 'https://picsum.photos/300/200?random=14',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};