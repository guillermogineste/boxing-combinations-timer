import combinations from "../combinations.json";
import { CombinationSet } from "../types";

export const getRandomSet = (): CombinationSet => {
  const list: CombinationSet[] = combinations["additive"];
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
