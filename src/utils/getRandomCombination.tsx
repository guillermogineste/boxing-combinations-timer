import combinations from "../combinations.json";
import { Combination, Combinations } from "../types";

function validateCombinations(data: any): data is Combinations {
  // You can add more detailed checks depending on your exact data structure.
  return (
    data &&
    Array.isArray(data.simple) &&
    Array.isArray(data.advanced) &&
    Array.isArray(data.additive)
  );
}

if (!validateCombinations(combinations)) {
  throw new Error("Invalid combinations JSON structure.");
}

export const getRandomCombination = (
  type: "simple" | "advanced" | "both" | "additive"
): Combination => {
  let list: Combination[] = [];

  if (type === "both") {
    list = [...combinations.simple, ...combinations.advanced];
  } else {
    list = combinations[type];
  }

  const randomIndex = Math.floor(Math.random() * list.length);
  console.log(list[randomIndex]);
  return list[randomIndex];
};
