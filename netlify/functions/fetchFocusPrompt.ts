import { Handler } from '@netlify/functions';
import { fetchRandomFocusPrompt } from './sanityFetchers';

/**
 * Netlify function handler to fetch a random focus prompt.
 * The function fetches a random focus prompt from the Sanity backend and returns it
 * with a 200 status code. In case of an error, it returns a 500 status code with an error message.
 */

const handler: Handler = async (event, context) => {
    try {
      // Fetch a random focus prompt
      const focusPrompt = await fetchRandomFocusPrompt();
      
      // Return the fetched prompt with a 200 status code
      return {
        statusCode: 200,
        body: JSON.stringify(focusPrompt),
      };
    } catch (error) {
      // Return an error message with a 500 status code in case of failure
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch focus prompt' }),
      };
    }
  };
  
  export { handler };