import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'z0g8iogi', // Your project ID
  dataset: 'production', // Your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
});

exports.handler = async (event, context) => {
  try {
    const data = await client.fetch('*[_type == "simple-combination"]');
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};