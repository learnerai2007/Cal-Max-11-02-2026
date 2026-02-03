
import { CalculatorDef } from '../../types';

export const PROBABILITY_CALC: CalculatorDef = {
  id: 'math-probability',
  name: 'Permutations & Combinations',
  description: 'Calculate nPr (Permutations) and nCr (Combinations) for given n and r.',
  category: 'Math',
  icon: 'Dice5',
  inputs: [
    { id: 'n', label: 'Total items (n)', type: 'number', defaultValue: 10 },
    { id: 'r', label: 'Chosen items (r)', type: 'number', defaultValue: 3 },
  ],
  calculate: (inputs) => {
    const n = Math.floor(Number(inputs.n));
    const r = Math.floor(Number(inputs.r));

    if (r > n || n < 0 || r < 0) return { error: 'Invalid n or r' };

    const fact = (num: number): number => {
      let res = 1;
      for (let i = 2; i <= num; i++) res *= i;
      return res;
    };

    const nCr = fact(n) / (fact(r) * fact(n - r));
    const nPr = fact(n) / fact(n - r);

    return { nCr, nPr };
  },
  formatResults: (raw) => {
    if (raw.error) return [{ id: 'err', label: 'Error', value: raw.error as string, type: 'text' }];
    return [
      { id: 'ncr', label: 'Combinations (nCr)', value: raw.nCr as number, type: 'number', highlight: true },
      { id: 'npr', label: 'Permutations (nPr)', value: raw.nPr as number, type: 'number' }
    ];
  }
};
