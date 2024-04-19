import combinations from "../combinations.json";
import { Combination } from "../types";

export const getRandomCombination = (
  type: "simple" | "advanced" | "both",
  stance: "orthodox" | "southpaw" | "both"
): Combination => {
  let list: Combination[] = [];
  

  if (type === "both") {
    list = [...combinations.simple, ...combinations.advanced];
  } else {
    list = combinations[type];
  }

  if (stance !== "both") {
    list = list.filter(combination => combination.stance.includes(stance));
  }
  console.log (list)
  // console.log(`Filtered list for stance ${stance}:`, list);

  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
