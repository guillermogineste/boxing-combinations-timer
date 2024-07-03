/**
 * Fetches the total number of additive combinations from the server.
 * @returns A promise that resolves to the total number of additive combinations.
 */
export const getTotalAdditiveCombinations = async (): Promise<number> => {
    const response = await fetch('/.netlify/functions/fetchTotalAdditiveCombinations');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };