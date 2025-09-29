import express, { Application } from 'express';
import indexRouter from './routes/index';
import healthRouter from './routes/health';
import apiRouter from './routes/api';
import { requestLogger, notFoundHandler, errorHandler } from './middleware';
import logger from './utils/logger';
import { setupSwagger } from './config/swagger';

// Create Express application
const createApp = (): Application => {
  const app = express();

  // Global middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Routes
  app.use('/', indexRouter);
  app.use('/', healthRouter);
  app.use('/api', apiRouter);

  // Setup Swagger documentation
  setupSwagger(app);

  // 404 handler (must be after all routes)
  app.use('*', notFoundHandler);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};

// Start server function
const startServer = (port: number = 3000): Application => {
  const app = createApp();

  app.listen(port, () => {
    logger.info(`🚀 Server running on http://localhost:${port}`);
    logger.info(`📊 Health check: http://localhost:${port}/health`);
    logger.info(`🔗 API endpoints: http://localhost:${port}/api`);
    logger.info(`📚 API Documentation: http://localhost:${port}/api-docs`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  return app;
};

// Export app factory for testing
export { createApp, startServer };

// Start the server if this file is run directly
if (require.main === module) {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  startServer(port);
}
