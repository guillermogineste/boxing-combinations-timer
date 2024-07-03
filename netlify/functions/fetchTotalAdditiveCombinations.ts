import { Handler } from '@netlify/functions';
import { fetchTotalAdditiveCombinations } from './sanityFetchers';

const handler: Handler = async (event, context) => {
  try {
    const totalAdditiveCombinations = await fetchTotalAdditiveCombinations();
    return {
      statusCode: 200,
      body: JSON.stringify(totalAdditiveCombinations),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch total additive combinations' }),
    };
  }
};

export { handler };