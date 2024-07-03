import { Handler } from '@netlify/functions';
import { fetchTotalSimpleCombinations } from './sanityFetchers';

/**
 * Netlify function handler to fetch the total number of simple combinations.
 * The function fetches the total number of simple combinations from the Sanity backend and returns it
 * with a 200 status code. In case of an error, it returns a 500 status code with an error message.
 */

const handler: Handler = async (event, context) => {
  try {
    // Fetch the total number of simple combinations
    const totalSimpleCombinations = await fetchTotalSimpleCombinations();
    
    // Return the fetched total with a 200 status code
    return {
      statusCode: 200,
      body: JSON.stringify(totalSimpleCombinations),
    };
  } catch (error) {
    // Return an error message with a 500 status code in case of failure
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch total simple combinations' }),
    };
  }
};

export { handler };