import OpenAI from 'openai';

const OPEN_API_KEY = process.env.OPENAI_API_KEY;

const openaiClient = new OpenAI({
  apiKey: OPEN_API_KEY,
});

export { openaiClient };
