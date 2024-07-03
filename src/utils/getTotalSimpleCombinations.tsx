/**
 * Fetches the total number of simple combinations from the server.
 * @returns A promise that resolves to the total number of simple combinations.
 */
export const getTotalSimpleCombinations = async (): Promise<number> => {
    const response = await fetch('/.netlify/functions/fetchTotalSimpleCombinations');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };