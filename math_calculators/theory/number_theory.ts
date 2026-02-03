
import { CalculatorDef } from '../../types';

export const NUMBER_THEORY_CALC: CalculatorDef = {
  id: 'math-theory',
  name: 'Number Theory Pro',
  description: 'Check primality and calculate Greatest Common Divisor (GCD) and Least Common Multiple (LCM).',
  category: 'Math',
  icon: 'Hash',
  inputs: [
    { id: 'n1', label: 'First Number (n1)', type: 'number', defaultValue: 12 },
    { id: 'n2', label: 'Second Number (n2)', type: 'number', defaultValue: 18 },
  ],
  calculate: (inputs) => {
    const n1 = Math.floor(Math.abs(Number(inputs.n1)));
    const n2 = Math.floor(Math.abs(Number(inputs.n2)));

    const isPrime = (n: number) => {
      if (n <= 1) return false;
      if (n <= 3) return true;
      if (n % 2 === 0 || n % 3 === 0) return false;
      for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
      }
      return true;
    };

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const valGcd = gcd(n1, n2);
    const valLcm = (n1 * n2) / valGcd;

    return { 
      n1Prime: isPrime(n1), 
      n2Prime: isPrime(n2), 
      gcd: valGcd, 
      lcm: valLcm 
    };
  },
  formatResults: (raw) => [
    { id: 'gcd', label: 'GCD', value: raw.gcd as number, type: 'number', highlight: true },
    { id: 'lcm', label: 'LCM', value: raw.lcm as number, type: 'number' },
    { id: 'p1', label: 'n1 is Prime?', value: raw.n1Prime ? 'Yes' : 'No', type: 'text' },
    { id: 'p2', label: 'n2 is Prime?', value: raw.n2Prime ? 'Yes' : 'No', type: 'text' }
  ]
};
