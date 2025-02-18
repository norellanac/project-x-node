import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation.',
    },
    // servers: [
    //   {
    //     url: 'http://localhost:8000',
    //     description: 'Local server',
    //   },
    // ],
  },
  apis: ['src/api/v1/routes/**/*.ts', './src/publicSwagger.ts', './src/api/v1/models/swaggerModels.ts'], // Make sure this path matches your project structure
};

export { swaggerOptions };