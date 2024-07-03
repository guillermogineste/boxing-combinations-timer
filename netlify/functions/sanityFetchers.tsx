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
            return `*[${baseQuery} && isOrthodox == true && isSouthpaw == false]`;
        case "southpaw":
            return `*[${baseQuery} && isOrthodox == false && isSouthpaw == true]`;
        case "both":
        default:
            return `*[${baseQuery}]`;
    }
}

/**
 * Fetches a random simple-combination document based on the given stance.
 * Ensures that the same combination is not repeated until all combinations are used.
 * @param previousCombinations - List of previously fetched combination IDs.
 * @param stance - The stance for which to fetch the combination ("orthodox", "southpaw", or "both").
 * @returns A promise that resolves to a random simple-combination or undefined if no combinations are available.
 */
export async function fetchRandomSimpleCombination(previousCombinations: string[], stance: Stance): Promise<SimpleCombination | undefined> {
    const baseQuery = '_type == "simple-combination"';
    const query = constructQuery(baseQuery, stance);
    const data: SimpleCombination[] = await client.fetch(query);
    const availableCombinations = data.filter(
        doc => !previousCombinations.includes(doc._id)
    );
    const randomIndex = Math.floor(Math.random() * availableCombinations.length);
    return availableCombinations[randomIndex];
}

/**
 * Fetches a random additive-combination document based on the given stance.
 * Ensures that the same combination is not repeated until all combinations are used.
 * @param previousCombinations - List of previously fetched combination IDs.
 * @param stance - The stance for which to fetch the combination ("orthodox", "southpaw", or "both").
 * @returns A promise that resolves to a random additive-combination or undefined if no combinations are available.
 */
export async function fetchRandomAdditiveCombination(previousCombinations: string[], stance: Stance): Promise<AdditiveCombination | undefined> {
    const baseQuery = '_type == "additive-combination"';
    const query = constructQuery(baseQuery, stance);
    const data: AdditiveCombination[] = await client.fetch(query);
    const availableCombinations = data.filter(
        doc => !previousCombinations.includes(doc._id)
    );
    const randomIndex = Math.floor(Math.random() * availableCombinations.length);
    return availableCombinations[randomIndex];
}

/**
 * Fetches a random focus-prompt document.
 * Repetition of focus-prompt documents is allowed.
 * @returns A promise that resolves to a random focus-prompt.
 */
export async function fetchRandomFocusPrompt(): Promise<FocusPrompt | undefined> {
    const query = '*[_type == "focus-prompt"]';
    const data: FocusPrompt[] = await client.fetch(query);
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

/**
 * Fetches the total number of simple-combination documents.
 * @returns A promise that resolves to the total number of simple-combinations.
 */
export async function fetchTotalSimpleCombinations(): Promise<number> {
    const query = 'count(*[_type == "simple-combination"])';
    try {
        const totalSimpleCombinations = await client.fetch(query);
        return totalSimpleCombinations;
    } catch (error) {
        console.error('Failed to fetch total simple combinations:', error);
        return 0;
    }
};

/**
 * Fetches the total number of additive-combination documents.
 * @returns A promise that resolves to the total number of additive-combinations.
 */
export async function fetchTotalAdditiveCombinations(): Promise<number> {
    const query = 'count(*[_type == "additive-combination"])';
    try {
        const totalAdditiveCombinations = await client.fetch(query);
        return totalAdditiveCombinations;
    } catch (error) {
        console.error('Failed to fetch total additive combinations:', error);
        return 0;
    }
};