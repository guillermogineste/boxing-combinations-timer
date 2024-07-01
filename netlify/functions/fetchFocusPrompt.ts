import { Handler } from '@netlify/functions';
import { fetchRandomFocusPrompt } from './sanityFetchers';

const handler: Handler = async (event, context) => {
  try {
    const focusPrompt = await fetchRandomFocusPrompt();
    return {
      statusCode: 200,
      body: JSON.stringify(focusPrompt),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch focus prompt' }),
    };
  }
};

export { handler };