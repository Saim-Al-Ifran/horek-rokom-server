import swaggerJsDoc from 'swagger-jsdoc';



const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Management API',
      version: '1.0.0',
      description: 'API for managing books',
      contact: {
        name: 'Your Name',
        email: 'your-email@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API route files
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
