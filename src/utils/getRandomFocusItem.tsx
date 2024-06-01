import combinations from "../combinations.json";
import { FocusItem } from "../types";

export const getRandomFocusItem = (): FocusItem => {
  const list: FocusItem[] = combinations["focus"];
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};