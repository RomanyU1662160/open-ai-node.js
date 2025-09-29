import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { getChatResponse } from '../clients/openai';

const apiRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
apiRouter.get('/users', (req: Request, res: Response) => {
  logger.debug('Users endpoint accessed');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];
  res.status(200).json(users);
});

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Get API status
 *     description: Returns the current status and available endpoints of the API
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API status information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 api:
 *                   type: string
 *                   example: "v1"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 endpoints:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["/users", "/status", "/chat"]
 */
apiRouter.get('/status', (req: Request, res: Response) => {
  logger.debug('API status endpoint accessed');

  res.status(200).json({
    api: 'v1',
    status: 'active',
    endpoints: ['/users', '/status', '/chat'],
  });
});

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Chat with AI
 *     description: Send a message to the AI and get a response
 *     tags: [AI Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: Successful chat response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       400:
 *         description: Bad request - message is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Message is required"
 *                 example:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "What is the capital of England?"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    logger.debug('Chat endpoint accessed');
    const { message } = req.body;

    if (!message) {
      res.status(400).json({
        error: 'Message is required',
        example: { message: 'What is the capital of England?' },
      });
      return;
    }

    logger.info(`Processing chat request: ${message.substring(0, 50)}...`);
    const response = await getChatResponse(message);

    res.status(200).json({
      question: message,
      answer: response,
      model:
        process.env.OPENAI_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct',
    });
  } catch (error) {
    logger.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'Failed to get chat response',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
export default apiRouter;
