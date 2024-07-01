import { FocusItem } from "../types";

export const getRandomFocusItem = async (): Promise<FocusItem | null> => {
  try {
    const response = await fetch('/.netlify/functions/fetchFocusPrompt');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const focusPrompt: FocusItem = await response.json();
    return focusPrompt;
  } catch (error) {
    console.error('Failed to fetch focus prompt:', error);
    return null; // Return null instead of undefined
  }
};