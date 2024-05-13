import combinations from "../combinations.json";
import { AdditiveSet } from "../types";

let usedSets: AdditiveSet[] = [];

export const getRandomSet = (stance: "orthodox" | "southpaw" | "both"): AdditiveSet => {
  let list: AdditiveSet[] = combinations["additive"];

  if (stance !== "both") {
    list = list.filter(set => set.stance.includes(stance));
  }

  let randomIndex = Math.floor(Math.random() * list.length);
  let selectedSet = list[randomIndex];

  while (usedSets.includes(selectedSet)) {
    if (usedSets.length === list.length) {
        resetUsedSets();
        break;
    }
    randomIndex = Math.floor(Math.random() * list.length);
    selectedSet = list[randomIndex];
}

  usedSets.push(selectedSet);
  return selectedSet;
};

export const resetUsedSets = () => {
  usedSets = [];
};