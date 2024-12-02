'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert ProductServices
    const productServices = await queryInterface.bulkInsert('ProductServices', [
      {
        name: 'Software Development',
        description: 'Description for Software Development',
        type: 1,
        price: 100.0,
        specialPrice: 90.0,
        location: 'Cobán, Guatemala',
        latitude: 40.7128,
        longitude: -74.0060,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cleaning Service',
        description: 'Description for Cleaning Service',
        type: 1,
        price: 200.0,
        specialPrice: 180.0,
        location: 'Santa Apolonia, Guatemala',
        latitude: 34.0522,
        longitude: -118.2437,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });



    // Insert ProductCategory associations
    await queryInterface.bulkInsert('ProductCategory', [
      {
        productServiceId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Insert ProductDetails
    await queryInterface.bulkInsert('ProductDetails', [
      {
        productServiceId: 1,
        label: 'Especialization',
        value: 'Mobile Apps Development',
        description: 'We specialize in developing mobile applications',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productServiceId: 1,
        label: 'Especialization',
        value: 'Cleaning services for homes',
        description: 'We clean your home to make you feel comfortable',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Insert ProductLocations
    await queryInterface.bulkInsert('ProductLocations', [
      {
        productServiceId: 1,
        name: 'Coban, Guatemala',
        description: 'Service available in Coban, Guatemala',
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
        description: 'Service available in Santa Apolonia, Guatemala and surrounding areas',
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
        description: 'Service available in Santa Apolonia, Guatemala and surrounding areas',
        type: 1,
        cityId: 29, // Assuming city with id  exists
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