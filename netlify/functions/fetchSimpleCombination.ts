import { Handler } from '@netlify/functions';
import { fetchRandomSimpleCombination } from './sanityFetchers';

type Stance = "orthodox" | "southpaw" | "both";

const handler: Handler = async (event, context) => {
  try {
    const stance = (event.queryStringParameters?.stance as Stance) || "orthodox";
    const simpleCombination = await fetchRandomSimpleCombination([], stance);
    return {
      statusCode: 200,
      body: JSON.stringify(simpleCombination),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch simple combination' }),
    };
  }
};

export { handler };