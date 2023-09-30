export interface Combination {
  description: string;
}

export interface Combinations {
  simple: Combination[];
  advanced: Combination[];
}

export interface AdditiveSet {
  set1: Array<{ description: string }>;
  set2: Array<{ description: string }>;
  set3: Array<{ description: string }>;
}
