import { Router, Request, Response } from 'express';
import logger from '../utils/logger';

const healthRouter = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the server
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Server is running!"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-09-29T02:00:00.000Z"
 */
healthRouter.get('/health', (req: Request, res: Response) => {
  logger.debug('Health check endpoint accessed');

  res.status(200).json({
    status: 'OK',
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
