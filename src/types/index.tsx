export interface Combination {
  description?: string;
  set1?: string;
  set2?: string;
  set3?: string;
}

export interface AdditiveCombination {
  set1: Array<{ description: string }>;
  set2: Array<{ description: string }>;
  set3: Array<{ description: string }>;
}

export interface Combinations {
  simple: Combination[];
  advanced: Combination[];
  additive: AdditiveCombination[];
}
