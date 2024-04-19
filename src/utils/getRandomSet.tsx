import combinations from "../combinations.json";
import { AdditiveSet } from "../types";

export const getRandomSet = (stance: "orthodox" | "southpaw" | "both"): AdditiveSet => {
  let list: AdditiveSet[] = combinations["additive"];

  if (stance !== "both") {
    list = list.filter(set => set.stance.includes(stance));
  }

  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
