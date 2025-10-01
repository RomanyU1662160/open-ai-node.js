import { openaiClient } from '../clients/openai';
import { OpenAiRepo } from '../repos/openai.repo';

const openapi_model = 'gpt-5-nano';

export const OpenaiService = {
  getChatResponse: async (content: string, conversationId: string) => {
    console.log('Requesting response from OpenAI...for question:', content);

    const response = await openaiClient.responses.create({
      model: openapi_model,
      input: [{ role: 'user', content: content }],
      store: true,
      previous_response_id: OpenAiRepo.getLastResponseId(conversationId),
      max_output_tokens: 2000,
      tools: [
        {
          type: 'web_search_2025_08_26',
        },
      ],
      //service_tier: 'flex', // flex for low cost with low latency, standard for better performance
    });
    OpenAiRepo.setLastResponseId(conversationId, response.id);

    return response;
  },
};
