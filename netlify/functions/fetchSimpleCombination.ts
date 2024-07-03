import { Handler } from '@netlify/functions';
import { fetchRandomSimpleCombination } from './sanityFetchers';

type Stance = "orthodox" | "southpaw" | "both";

/**
 * Netlify function handler to fetch a random simple combination based on the given stance.
 * The stance is extracted from the query parameters, defaulting to "orthodox" if not provided.
 * The function fetches a random simple combination from the Sanity backend and returns it
 * with a 200 status code. In case of an error, it returns a 500 status code with an error message.
 */

const handler: Handler = async (event, context) => {
  try {
    // Extract the stance from query parameters, default to "orthodox"
    const stance = (event.queryStringParameters?.stance as Stance) || "orthodox";
    
    // Fetch a random simple combination based on the stance
    const simpleCombination = await fetchRandomSimpleCombination([], stance);
    
    // Return the fetched combination with a 200 status code
    return {
      statusCode: 200,
      body: JSON.stringify(simpleCombination),
    };
  } catch (error) {
    // Return an error message with a 500 status code in case of failure
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch simple combination' }),
    };
  }
};

export { handler };