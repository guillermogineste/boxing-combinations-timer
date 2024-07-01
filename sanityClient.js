import { createClient } from '@sanity/client';

export default createClient({
  projectId: 'z0g8iogi', // Your project ID
  dataset: 'production', // Your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
});