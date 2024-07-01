import combinations from "../combinations.json";
import { Combination } from "../types";

let usedCombinations: Combination[] = [];

export const getRandomCombination = (
  stance: "orthodox" | "southpaw" | "both"
): Combination => {
  let list: Combination[] = [];
  list = combinations["simple"]

  if (stance !== "both") {
    list = list.filter(combination => combination.stance.includes(stance));
  }

  let randomIndex = Math.floor(Math.random() * list.length);
  let selectedCombination = list[randomIndex];

  while (usedCombinations.includes(selectedCombination)) {
    if (usedCombinations.length === list.length) {
        resetUsedCombinations();
        break;
    }
    randomIndex = Math.floor(Math.random() * list.length);
    selectedCombination = list[randomIndex];
}

  usedCombinations.push(selectedCombination);
  return selectedCombination;
};

export const resetUsedCombinations = () => {
  usedCombinations = [];
};
