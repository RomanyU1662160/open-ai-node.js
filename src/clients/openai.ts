import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index';

const OPEN_API_KEY = process.env.ABACUS_API_KEY;
const OPEN_API_BASE_URL = process.env.OPEN_API_BASE_URL;
const stream = true;

// Model configuration from environment variables
// Available models with pricing:
// - meta-llama/Meta-Llama-3.1-8B-Instruct: $0.02/M Input, $0.05/M Output (Default)
// - gpt-5-nano: $0.05/M Input, $2.00/M Output
// - openai/gpt-oss-120b: $0.08/M Input, $0.44/M Output
const model =
  process.env.OPENAI_MODEL || 'meta-llama/Meta-Llama-3.1-8B-Instruct';

console.log('OPEN_API_KEY:::>>>', OPEN_API_KEY);
console.log('OPEN_API_BASE_URL:::>>>', OPEN_API_BASE_URL);
console.log('SELECTED_MODEL:::>>>', model);

const openai = new OpenAI({
  baseURL: OPEN_API_BASE_URL,
  apiKey: OPEN_API_KEY,
});

const getChatResponse = async (content: string, max_tokens: number = 1000) => {
  let response = '';
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',

      content:
        'You are a helpful assistant that helps people find information, be concise and clear.',
    },
    {
      role: 'user',
      content: content,
    },
  ];
  if (stream) {
    const chat_completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: true, //
      stream_options: { include_usage: true },
      max_completion_tokens: max_tokens, // this is to limit the response length
      max_tokens: max_tokens, // this is to limit the response length
      // frequency_penalty: 0, // this is to control the frequency of tokens which means how often a token is repeated in the response
      // temperature: 0.7,
      // top_p: 0.8,
      // n: 1, // number of responses to generate
    });

    // Accumulate the streaming response
    for await (const event of chat_completion) {
      if (event.choices[0].finish_reason) {
        // Stream is finished
        console.log('Stream finished:', event.choices[0].finish_reason);
        break;
      } else if (event.choices[0]?.delta?.content) {
        // Accumulate each chunk
        response += event.choices[0].delta.content;
        // Optional: show progress with dots or current chunk
        process.stdout.write(event.choices[0].delta.content);
      }
    }

    // Print the complete response
    console.log('\n--- Complete Response ---');
    console.log(response);
    console.log('--- End Response ---\n');

    return response;
  } else {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: false,
    });
    const model_response = completion.choices[0].message || '';
    messages.push(model_response);
    console.log('Complete Response:', model_response);
    response = completion.choices[0].message.content || '';
    return response;
  }
};

export { getChatResponse };
