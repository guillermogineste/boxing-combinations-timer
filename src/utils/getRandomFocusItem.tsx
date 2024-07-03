import { FocusItem } from "../types";

/**
 * Fetches a random focus item from the server.
 * The function makes a request to the Netlify function to fetch a random focus prompt.
 * If successful, it returns the focus prompt. In case of an error, it logs the error and returns null.
 */

export const getRandomFocusItem = async (): Promise<FocusItem | null> => {
  try {
    // Make a request to the Netlify function to fetch a random focus prompt
    const response = await fetch('/.netlify/functions/fetchFocusPrompt');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Parse the response as a FocusItem
    const focusPrompt: FocusItem = await response.json();
    return focusPrompt;
  } catch (error) {
    // Log the error and return null in case of failure
    console.error('Failed to fetch focus prompt:', error);
    return null; // Return null instead of undefined
  }
};