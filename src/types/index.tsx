export interface Combination {
  description: string;
  stance: string[];
}

export interface Combinations {
  simple: Combination[];
  advanced: Combination[];
}

export interface AdditiveSet {
  _id: string;
  _type: string;
  description: string;
  set1: string;
  set2: string;
  set3: string;
  isOrthodox: boolean;
  isSouthpaw: boolean;
}

export interface FocusItem {
  description: string;
}

export type Stance = "orthodox" | "southpaw" | "both";