'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Construcción y Remodelación',
        description: 'Contratistas, arquitectos, ingenieros, albañiles',
        icon: '/uploads/categories/category-1.svg',
        urlImage: '/uploads/categories/category-1.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Servicios Industriales',
        description: 'Electricistas, plomeros, soldadores, carpinteros',
        icon: '/uploads/categories/category-2.svg',
        urlImage: '/uploads/categories/category-2.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mecánica y Autos',
        description: 'Mecánicos, elecromecánicos, pilotos, gruas y más',
        icon: '/uploads/categories/category-3.svg',
        urlImage: '/uploads/categories/category-3.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hogar y Jardín',
        description: 'Mantenimiento de casas, edificios y oficinas',
        icon: '/uploads/categories/category-4.svg',
        urlImage: '/uploads/categories/category-4.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tecnología y Computación',
        description: 'Jaridnería, limpieza, plomería, cerrajería',
        icon: '/uploads/categories/category-5.svg',
        urlImage: '/uploads/categories/category-5.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bienestar y Cuidado Personal',
        description: 'Reparación de computadoras, celulares, televisores',
        icon: '/uploads/categories/category-6.svg',
        urlImage: '/uploads/categories/category-6.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eventos y Celebraciones',
        description : 'Médicos, dentistas, estilistas, masajistas',
        icon: '/uploads/categories/category-7.svg',
        urlImage: '/uploads/categories/category-7.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clases y Tutorías',
        description: 'Organizadores de eventos, payasos, músicos, magos',
        icon: '/uploads/categories/category-8.svg',
        urlImage: '/uploads/categories/category-8.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asesoría Profesional',
        description: 'Profesores, tutores, traductores, instructores',
        icon: '/uploads/categories/category-9.svg',
        urlImage: '/uploads/categories/category-9.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reparaciones Especializadas',
        description: 'Abogados, notarios, mediadores, gestores',
        icon: '/uploads/categories/category-10.svg',
        urlImage: '/uploads/categories/category-10.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cuidado de Mascotas',
        description: 'Reparación de electrodomésticos, muebles, ropa',
        icon: '/uploads/categories/category-11.svg',
        urlImage: '/uploads/categories/category-11.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logística y Transporte',
        description: 'Reparación de electrodomésticos, muebles, ropa',
        icon: '/uploads/categories/category-12.svg',
        urlImage: '/uploads/categories/category-12.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};