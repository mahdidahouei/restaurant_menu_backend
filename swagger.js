// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cafe Menu App API',
      version: '1.0.0',
      description: 'API documentation for the restaurant menu website. Developed by Mahdi Dahouei',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          description: 'Enter JWT Bearer token **_only_**',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};


const specs = swaggerJsdoc(options);



module.exports = { specs, swaggerUi };
