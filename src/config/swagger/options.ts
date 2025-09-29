import swaggerJsdoc from 'swagger-jsdoc';
import { commonSchemas } from './schemas';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API',
      version: '1.0.0',
      description:
        'A robust Express.js server built with TypeScript, featuring AI chat, Winston logging, and comprehensive testing.',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server',
      },
      {
        url: 'https://api.yourdomain.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: commonSchemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
        },
      },
    },
    tags: [
      {
        name: 'System',
        description: 'System health and information endpoints',
      },
      {
        name: 'Users',
        description: 'User management operations',
      },
      {
        name: 'AI Chat',
        description: 'AI chat and conversation endpoints',
      },
    ],
  },
  apis: [
    './src/routes/*.ts', // Path to the API routes
    './src/dtos/*.ts', // Path to DTOs for additional schema definitions
  ],
};
