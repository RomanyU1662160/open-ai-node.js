import z from 'zod';

export const OpenAIRequestBodySchema = z.object({
  message: z.string().trim().min(1),
  conversationId: z
    .string()
    .trim()
    .min(1)
    .regex(/^conv_[a-zA-Z0-9-_]+$/),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  maxTokens: z.number().min(1).max(4000).optional().default(100),
});

export const OpenAIResponseSchema = z.object({
  answer: z.string().trim(),
  model: z.string().trim().min(1),
  usage: z.object({
    promptTokens: z.number().min(0),
    completionTokens: z.number().min(0),
    totalTokens: z.number().min(0),
  }),
  total_token: z.number().min(0),
  timestamp: z.string().trim().min(1),
});

export type OpenAIRequestBody = z.infer<typeof OpenAIRequestBodySchema>;
export type OpenAIResponse = z.infer<typeof OpenAIResponseSchema>;
