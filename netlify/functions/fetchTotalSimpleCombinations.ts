import { Handler } from '@netlify/functions';
import { fetchTotalSimpleCombinations } from './sanityFetchers';

const handler: Handler = async (event, context) => {
  try {
    const totalSimpleCombinations = await fetchTotalSimpleCombinations();
    return {
      statusCode: 200,
      body: JSON.stringify(totalSimpleCombinations),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch total simple combinations' }),
    };
  }
};

export { handler };