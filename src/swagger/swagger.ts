import swaggerJSDOC from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Express } from 'express';
import logger from '../utils/logger.js';

// Metada info about our API
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'B.O.B API',
      version: '1.0.0',
      description: 'API del bot B.O.B',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

// JSON Format documentation
const swaggerSpec = swaggerJSDOC(options);

// Setup docs
const swaggerDocs = (app: Express, port: string | 8080) => {
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  logger.info(`Swagger docs available at http://localhost:${port}/api/docs`);
};

export default swaggerDocs;
