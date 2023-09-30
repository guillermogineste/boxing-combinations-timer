import combinations from "../combinations.json";
import { AdditiveSet } from "../types";

export const getRandomSet = (): AdditiveSet => {
  const list: AdditiveSet[] = combinations["additive"];
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
