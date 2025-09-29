import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Request logging middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  // Log the incoming request
  logger.http(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const logLevel = statusCode >= 400 ? 'warn' : 'http';

    logger.log(
      logLevel,
      `${req.method} ${req.originalUrl} - ${statusCode} - ${duration}ms`
    );
  });

  next();
};

// 404 handler middleware
export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn(
    `404 Not Found: ${req.method} ${req.originalUrl} - IP: ${req.ip}`
  );

  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
};

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error on ${req.method} ${req.originalUrl}: ${err.message}`, {
    stack: err.stack,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : err.name || 'Error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong!',
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};
