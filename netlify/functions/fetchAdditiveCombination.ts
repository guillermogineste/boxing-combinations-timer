import { Handler } from '@netlify/functions';
import { fetchRandomAdditiveCombination } from './sanityFetchers';

type Stance = "orthodox" | "southpaw" | "both";

const handler: Handler = async (event, context) => {
  try {
    const stance = (event.queryStringParameters?.stance as Stance) || "orthodox";
    const additiveCombination = await fetchRandomAdditiveCombination([], stance);
    return {
      statusCode: 200,
      body: JSON.stringify(additiveCombination),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch additive combination' }),
    };
  }
};

export { handler };