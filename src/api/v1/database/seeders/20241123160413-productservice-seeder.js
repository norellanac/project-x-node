'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert ProductServices
    await queryInterface.bulkInsert('ProductServices', [
      {
        name: 'Limpieza de casas y apartamentos',
        description: 'Servicio de limpieza de casas y apartamentos',
        type: 1,
        price: 150.0,
        specialPrice: 90.0,
        location: 'Cobán, Guatemala',
        latitude: 40.7128,
        longitude: -74.0060,
        userId: 1,
        averageRating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jardinería y Pintura',
        description: 'Servicio de jardinería y pintura de casas, apartamentos y oficinas',
        type: 1,
        price: 80.0,
        specialPrice: 65.0,
        location: 'Santa Apolonia, Guatemala',
        latitude: 34.0522,
        longitude: -118.2437,
        userId: 1,
        averageRating: 3.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taller Automotriz El Triunfo',
        description: 'Servicio de mecánica automotriz y reparación de vehículos',
        type: 1,
        price: 500.0,
        specialPrice: 450.0,
        location: 'Santa Apolonia, Guatemala',
        latitude: 34.0522,
        longitude: -118.2437,
        userId: 2,
        averageRating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taller De Enderezado Y Pintura',
        description: 'Servicio de enderezado y pintura de vehículos',
        type: 1,
        price: 2000.0,
        specialPrice: 1800.0,
        location: 'Tecpan, Guatemala',
        latitude: 34.0522,
        longitude: -118.2437,
        userId: 3,
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
      {
        productServiceId: 4,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 4,
        categoryId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Insert ProductDetails
    await queryInterface.bulkInsert('ProductDetails', [
      {
        productServiceId: 1,
        label: 'Especialization',
        value: 'Limpieza de hogares y apartamentos',
        description: 'Servicio de limpieza prfunda en 4 horas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        label: 'Especialization',
        value: 'Jardineria En Condominios',
        description: 'Jardinización y mantenimiento de áreas verdes en condominios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 3,
        label: 'Especialization',
        value: 'Servicio de mantenimiento de vehículos',
        description: 'Mantenimiento de vehículos de todas las marcas, precios desde 350',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 3,
        label: 'Especialization',
        value: 'Polarizado de vehículos',
        description: 'Polarizado de vehículos de todas las marcas, precios desde 250',
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
      {
        productServiceId: 4,
        name: 'Flores, Guatemala',
        description: 'Servicio disponible en Flores, Guatemala y alrededores',
        type: 1,
        cityId: 55, // Assuming city with id  exists
        latitude: 34.0522,
        longitude: -118.2437,
        createdAt: new Date(),
        updatedAt: new Date()
      }

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