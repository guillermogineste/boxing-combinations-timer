// import combinations from "../combinations.json";
import { Combination } from "../types";
import { getTotalSimpleCombinations } from "../utils/getTotalSimpleCombinations";

let usedCombinations: Combination[] = [];
let totalCombinations: number;

export const resetUsedCombinations = () => {
  usedCombinations = [];
};


/**
 * Fetches a random combination from the server based on the given stance.
 * @param stance - The stance for which to fetch the combination.
 * @returns A promise that resolves to a random combination.
 */
const fetchCombination = async (stance: "orthodox" | "southpaw" | "both"): Promise<Combination> => {
  const response = await fetch(`/.netlify/functions/fetchSimpleCombination?stance=${stance}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

/**
 * Fetches a random combination asynchronously based on the given stance.
 * Ensures that the same combination is not repeated until all combinations are used.
 * @param stance - The stance for which to fetch the combination ("orthodox", "southpaw", or "both").
 * @returns A promise that resolves to a random combination or null if an error occurs.
 */
export const getRandomCombinationAsync = async (stance: "orthodox" | "southpaw" | "both"): Promise<Combination | null> => {
  try {
    // Fetch the total number of combinations if not already fetched
    if (totalCombinations === undefined) {
      totalCombinations = await getTotalSimpleCombinations();
    }

    let simpleCombination = await fetchCombination(stance);

    // Check if the fetched combination has already been used
    while (usedCombinations.includes(simpleCombination)) {
      // If all combinations have been used, reset the used combinations array and break the loop
      if (usedCombinations.length === totalCombinations) {
        usedCombinations = [];
        break;
      }
      // Fetch a new combination if the current one has been used
      simpleCombination = await fetchCombination(stance);
    }

    // Add the new combination to the list of used combinations
    usedCombinations.push(simpleCombination);
    return simpleCombination;
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('Failed to fetch simple combination:', error);
    return null;
  }
};