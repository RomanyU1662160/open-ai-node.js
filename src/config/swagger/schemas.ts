// Common reusable schemas for Swagger documentation
export const commonSchemas = {
  Error: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        description: 'Error type',
      },
      message: {
        type: 'string',
        description: 'Error message',
      },
      path: {
        type: 'string',
        description: 'Request path that caused the error',
      },
      method: {
        type: 'string',
        description: 'HTTP method',
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        description: 'When the error occurred',
      },
    },
    example: {
      error: 'Route not found',
      message: 'The requested endpoint does not exist',
      path: '/api/nonexistent',
      method: 'GET',
      timestamp: '2025-09-29T02:00:00.000Z',
    },
  },

  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'User ID',
      },
      name: {
        type: 'string',
        description: "User's full name",
      },
      email: {
        type: 'string',
        format: 'email',
        description: "User's email address",
      },
    },
    example: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
  },

  ChatRequest: {
    type: 'object',
    required: ['message'],
    properties: {
      message: {
        type: 'string',
        description: 'The message to send to the AI',
        minLength: 1,
        maxLength: 1000,
      },
      temperature: {
        type: 'number',
        minimum: 0,
        maximum: 2,
        description: 'Controls randomness in the response (0-2)',
        default: 0.7,
      },
      maxTokens: {
        type: 'integer',
        minimum: 1,
        maximum: 4000,
        description: 'Maximum number of tokens in the response',
        default: 1000,
      },
    },
    example: {
      message: 'What is the capital of England?',
      temperature: 0.7,
      maxTokens: 1000,
    },
  },

  ChatResponse: {
    type: 'object',
    properties: {
      question: {
        type: 'string',
        description: 'The original question asked',
      },
      answer: {
        type: 'string',
        description: "The AI's response",
      },
      model: {
        type: 'string',
        description: 'The AI model used',
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        description: 'When the response was generated',
      },
      usage: {
        type: 'object',
        properties: {
          promptTokens: {
            type: 'integer',
            description: 'Tokens used for the prompt',
          },
          completionTokens: {
            type: 'integer',
            description: 'Tokens used for the completion',
          },
          totalTokens: {
            type: 'integer',
            description: 'Total tokens used',
          },
        },
      },
    },
    example: {
      question: 'What is the capital of England?',
      answer: 'The capital of England is London.',
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
      timestamp: '2025-09-29T02:00:00.000Z',
      usage: {
        promptTokens: 25,
        completionTokens: 8,
        totalTokens: 33,
      },
    },
  },
};
