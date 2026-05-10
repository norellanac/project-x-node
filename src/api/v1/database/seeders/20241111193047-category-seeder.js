'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Construcción y Remodelación',
        description: 'Contratistas, arquitectos, ingenieros, albañiles',
        icon: '/uploads/categories/category-1.png',
        urlImage: '/uploads/categories/category-1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Servicios Industriales',
        description: 'Electricistas, plomeros, soldadores, carpinteros',
        icon: '/uploads/categories/category-2.png',
        urlImage: '/uploads/categories/category-2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mecánica y Autos',
        description: 'Mecánicos, elecromecánicos, pilotos, gruas y más',
        icon: '/uploads/categories/category-3.png',
        urlImage: '/uploads/categories/category-3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hogar y Jardín',
        description: 'Mantenimiento de casas, edificios y oficinas',
        icon: '/uploads/categories/category-4.png',
        urlImage: '/uploads/categories/category-4.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnología y Computación',
        description: 'Jaridnería, limpieza, plomería, cerrajería',
        icon: '/uploads/categories/category-5.png',
        urlImage: '/uploads/categories/category-5.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bienestar y Cuidado Personal',
        description: 'Reparación de computadoras, celulares, televisores',
        icon: '/uploads/categories/category-6.png',
        urlImage: '/uploads/categories/category-6.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eventos y Celebraciones',
        description : 'Médicos, dentistas, estilistas, masajistas',
        icon: '/uploads/categories/category-7.png',
        urlImage: '/uploads/categories/category-7.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clases y Tutorías',
        description: 'Organizadores de eventos, payasos, músicos, magos',
        icon: '/uploads/categories/category-8.png',
        urlImage: '/uploads/categories/category-8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asesoría Profesional',
        description: 'Profesores, tutores, traductores, instructores',
        icon: '/uploads/categories/category-9.png',
        urlImage: '/uploads/categories/category-9.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reparaciones Especializadas',
        description: 'Abogados, notarios, mediadores, gestores',
        icon: '/uploads/categories/category-10.png',
        urlImage: '/uploads/categories/category-10.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cuidado de Mascotas',
        description: 'Reparación de electrodomésticos, muebles, ropa',
        icon: '/uploads/categories/category-11.png',
        urlImage: '/uploads/categories/category-11.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logística y Transporte',
        description: 'Reparación de electrodomésticos, muebles, ropa',
        icon: '/uploads/categories/category-12.png',
        urlImage: '/uploads/categories/category-12.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};