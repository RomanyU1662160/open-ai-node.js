import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerOptions } from './options';
import { swaggerUiOptions } from './ui-config';
import logger from '../../utils/logger';

export const setupSwagger = (app: Express): void => {
  try {
    // Generate swagger specification
    const swaggerSpec = swaggerJsdoc(swaggerOptions);

    // Serve swagger documentation
    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, swaggerUiOptions)
    );

    // Serve swagger.json for external tools
    app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    logger.info('✅ Swagger documentation setup completed');
    logger.info(`📚 API documentation available at: /api-docs`);
    logger.info(`📄 Swagger spec available at: /swagger.json`);
  } catch (error) {
    logger.error('❌ Failed to setup Swagger documentation:', error);
    throw new Error('Swagger setup failed');
  }
};
