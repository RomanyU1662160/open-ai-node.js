import { startServer } from './server';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

startServer(PORT);
// getOpenaiChatResponse('tell me joke');
