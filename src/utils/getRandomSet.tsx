// import combinations from "../combinations.json";
import { AdditiveSet } from "../types";
import { getTotalAdditiveCombinations } from "../utils/getTotalAdditiveCombinations";

let usedSets: AdditiveSet[] = [];
let totalCombinations: number;

/**
 * Resets the used sets array.
 */
export const resetUsedSets = () => {
  usedSets = [];
};

/**
 * Fetches a random set from the server based on the given stance.
 * @param stance - The stance for which to fetch the set.
 * @returns A promise that resolves to a random set.
 */
const fetchSet = async (stance: "orthodox" | "southpaw" | "both"): Promise<AdditiveSet> => {
  const response = await fetch(`/.netlify/functions/fetchAdditiveCombination?stance=${stance}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

/**
 * Fetches a random set asynchronously based on the given stance.
 * Ensures that the same set is not repeated until all sets are used.
 * @param stance - The stance for which to fetch the set ("orthodox", "southpaw", or "both").
 * @returns A promise that resolves to a random set or null if an error occurs.
 */
export const getRandomSetAsync = async (stance: "orthodox" | "southpaw" | "both"): Promise<AdditiveSet | null> => {
  try {
    // Fetch the total number of combinations if not already fetched
    if (totalCombinations === undefined) {
      totalCombinations = await getTotalAdditiveCombinations();
    }

    let additiveSet = await fetchSet(stance);

    // Check if the fetched set has already been used
    while (usedSets.includes(additiveSet)) {
      // If all sets have been used, reset the used sets array and break the loop
      if (usedSets.length === totalCombinations) {
        resetUsedSets();
        break;
      }
      // Fetch a new set if the current one has been used
      additiveSet = await fetchSet(stance);
    }

    // Add the new set to the list of used sets
    usedSets.push(additiveSet);
    return additiveSet;
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('Failed to fetch additive set:', error);
    return null;
  }
};

/**
 * Fetches a random set synchronously based on the given stance.
 * Ensures that the same set is not repeated until all sets are used.
 * @param stance - The stance for which to fetch the set ("orthodox", "southpaw", or "both").
 * @returns A random set.
 */
// export const getRandomSet = (stance: "orthodox" | "southpaw" | "both"): AdditiveSet => {
//   let list: AdditiveSet[] = combinations["additive"];

//   if (stance !== "both") {
//     list = list.filter(set => set.stance.includes(stance));
//   }

//   let randomIndex = Math.floor(Math.random() * list.length);
//   let selectedSet = list[randomIndex];

//   while (usedSets.includes(selectedSet)) {
//     if (usedSets.length === list.length) {
//       resetUsedSets();
//       break;
//     }
//     randomIndex = Math.floor(Math.random() * list.length);
//     selectedSet = list[randomIndex];
//   }

//   usedSets.push(selectedSet);
//   return selectedSet;
// };