import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'z0g8iogi',
  dataset: 'production',
  useCdn: true,
});

interface SimpleCombination {
  _id: string;
  description: string;
  isOrthodox: boolean;
  isSouthpaw: boolean;
}

interface AdditiveCombination {
  _id: string;
  description: string;
  set1: string;
  set2: string;
  set3: string;
  isOrthodox: boolean;
  isSouthpaw: boolean;
}

interface FocusPrompt {
  _id: string;
  description: string;
}

type Stance = "orthodox" | "southpaw" | "both";

// Function to construct the query based on stance
function constructQuery(baseQuery: string, stance: Stance): string {
  switch (stance) {
    case "orthodox":
      return `${baseQuery} && isOrthodox == true && isSouthpaw == false`;
    case "southpaw":
      return `${baseQuery} && isOrthodox == false && isSouthpaw == true`;
    case "both":
    default:
      return baseQuery;
  }
}

// Function 1: Fetch a random simple-combination document without repetition
export async function fetchRandomSimpleCombination(previousCombinations: string[], stance: Stance): Promise<SimpleCombination | undefined> {
  const baseQuery = '*[_type == "simple-combination"]';
  const query = constructQuery(baseQuery, stance);
  const data: SimpleCombination[] = await client.fetch(query);
  const availableCombinations = data.filter(
    doc => !previousCombinations.includes(doc._id)
  );
  const randomIndex = Math.floor(Math.random() * availableCombinations.length);
  return availableCombinations[randomIndex];
}

// Function 2: Fetch a random additive-combination document without repetition
export async function fetchRandomAdditiveCombination(previousCombinations: string[], stance: Stance): Promise<AdditiveCombination | undefined> {
  const baseQuery = '*[_type == "additive-combination"]';
  const query = constructQuery(baseQuery, stance);
  const data: AdditiveCombination[] = await client.fetch(query);
  const availableCombinations = data.filter(
    doc => !previousCombinations.includes(doc._id)
  );
  const randomIndex = Math.floor(Math.random() * availableCombinations.length);
  return availableCombinations[randomIndex];
}

// Function 3: Fetch a random focus-prompt document (repetition allowed)
export async function fetchRandomFocusPrompt(): Promise<FocusPrompt | undefined> {
  const query = '*[_type == "focus-prompt"]';
  const data: FocusPrompt[] = await client.fetch(query);
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}