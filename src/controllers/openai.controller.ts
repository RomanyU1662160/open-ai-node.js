import { OpenaiService } from '../services/openAi.service';
import { OpenAIResponse } from '../schemas/openai';
import logger from '../utils/logger';

export const OpenaiController = {
  getChatResponse: async (
    message: string,
    conversationId: string
  ): Promise<OpenAIResponse> => {
    try {
      const response = await OpenaiService.getChatResponse(
        message,
        conversationId
      );

      return {
        answer: response.output_text,
        model: response.model,
        usage: {
          promptTokens: response.usage?.input_tokens || 0,
          completionTokens: response.usage?.output_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
        total_token: response.usage?.total_tokens || 0,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Error fetch openai response');
      throw error;
    }
  },
};
