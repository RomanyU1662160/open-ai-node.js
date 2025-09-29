import { getChatResponse } from './clients/openai';
import { startServer } from './server';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

startServer(PORT);

getChatResponse('what is the capital of France?').then((response) => {
  console.log('Chat Response:', response);
});
