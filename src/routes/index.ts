import { Router, Request, Response } from 'express';

const indexRouter = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     description: Returns welcome message and available API endpoints
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Welcome message with endpoint information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Express TypeScript Server!"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     health:
 *                       type: string
 *                       example: "/health"
 *                     api:
 *                       type: string
 *                       example: "/api"
 *                     users:
 *                       type: string
 *                       example: "/api/users"
 */
// Root route
indexRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Express TypeScript Server!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      users: '/api/users',
    },
  });
});

export default indexRouter;
