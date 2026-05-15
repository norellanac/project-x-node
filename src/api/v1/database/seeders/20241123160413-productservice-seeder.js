'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert ProductServices
    await queryInterface.bulkInsert('ProductServices', [
      {
        name: 'Purificadora Agua Dulce Vida',
        description: 'Servicio de purificación de agua para restaurantes, hogares y oficinas  Tecpán, Guatemala y sus alrededores',
        type: 1,
        price: 12.0,
        specialPrice: 10.0,
        location: 'Tecpan, Guatemala',
        latitude: 14.6349,
        longitude: -90.5069,
        userId: 4,
        averageRating: 3.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agencia de viajes Pakal',
        description: 'Servicio de viajes y turismo en Guatemala, asesoria en vuelos, hoteles y tours en Guatemala y el mundo',
        type: 1,
        price: 500.0,
        specialPrice: 450.0,
        location: 'Tecpan, Guatemala',
        latitude: 14.6349,
        longitude: -90.5069,
        userId: 4,
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ByteCode - Software development',
        description: 'Desarrollo de software a la medida, aplicaciones móviles y web en Guatemala y el mundo',
        type: 1,
        price: 90000.0,
        specialPrice: 50000.0,
        location: 'Tecpan, Guatemala',
        latitude: 34.0522,
        longitude: -118.2437,
        userId: 4,
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);



    // Insert ProductCategory associations
    await queryInterface.bulkInsert('ProductCategory', [
      {
        productServiceId: 1,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 1,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 3,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 3,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    // Insert ProductDetails
    await queryInterface.bulkInsert('ProductDetails', [
      {
        productServiceId: 1,
        label: 'Especialization',
        value: 'Purificación de agua para consumo humano',
        description: 'Servicio de purificación de agua para consumo humano en difentes presentaciones, desde garrafones de 20 litros hasta sistemas de purificación para restaurantes y oficinas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        label: 'Vuelos y turismo',
        value: 'Asesoria en viajes y turismo, compras de vuelos, hoteles y tours',
        description: 'Servicio de asesoría en viajes y turismo, incluyendo la compra de vuelos, reservas de hoteles y organización de tours en Guatemala y el mundo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 3,
        label: 'Creación de software a la medida, conviertimos tus ideas en realidad',
        value: 'Desarrollo de software a la medida, aplicaciones móviles y web',
        description: 'Ofrecemos servicios de desarrollo de software a la medida, incluyendo aplicaciones móviles y web, para clientes en Guatemala y el mundo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    // Insert ProductLocations
    await queryInterface.bulkInsert('ProductLocations', [
      {
        productServiceId: 1,
        name: 'Coban, Guatemala',
        description: 'Estamos ubicados en Coban, Guatemala',
        type: 1,
        cityId: 1, // Assuming city with id 1 exists
        latitude: 40.7128,
        longitude: -74.0060,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        name: 'Santa Apolonia, Guatemala',
        description: 'Servicio disponible en Santa Apolonia, Guatemala y alrededores',
        type: 1,
        cityId: 30, // Assuming city with id exists
        latitude: 34.0522,
        longitude: -118.2437,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        name: 'Tecpan, Guatemala',
        description: 'Servicio disponible en Tecpan, Guatemala y alrededores',
        type: 1,
        cityId: 29, // Assuming city with id  exists
        latitude: 34.0522,
        longitude: -118.2437,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 3,
        name: 'Esquipulas, Guatemala',
        description: 'Servicio disponible en Esquipulas',
        type: 1,
        cityId: 45, // Assuming city with id exists
        latitude: 32.0522,
        longitude: -118.2437,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);

    // Insert ProductReviews
    await queryInterface.bulkInsert('ProductReviews', [
      {
        productServiceId: 1,
        userId: 1, // Assuming user with id exists
        rating: 5,
        comment: 'Great service!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 1,
        userId: 2, // Assuming user with id exists
        rating: 4,
        comment: 'Good service!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        userId: 1, // Assuming user with id exists
        rating: 3,
        comment: 'Average service!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        userId: 2, // Assuming user with id exists
        rating: 2,
        comment: 'Bad service!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductReviews', null, {});
    await queryInterface.bulkDelete('ProductLocations', null, {});
    await queryInterface.bulkDelete('ProductDetails', null, {});
    await queryInterface.bulkDelete('ProductCategory', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('ProductServices', null, {});
  }
};