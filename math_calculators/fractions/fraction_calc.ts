
import { CalculatorDef } from '../../types';

export const FRACTION_CALC: CalculatorDef = {
  id: 'math-fractions',
  name: 'Fraction Solver',
  description: 'Add, subtract, multiply, or divide fractions and get simplified results.',
  category: 'Math',
  icon: 'Layers',
  inputs: [
    { id: 'n1', label: 'Num 1', type: 'number', defaultValue: 1 },
    { id: 'd1', label: 'Den 1', type: 'number', defaultValue: 2 },
    { id: 'op', label: 'Operator', type: 'select', defaultValue: 'add', options: [
      { label: 'Add (+)', value: 'add' },
      { label: 'Subtract (-)', value: 'subtract' },
      { label: 'Multiply (×)', value: 'multiply' },
      { label: 'Divide (÷)', value: 'divide' }
    ]},
    { id: 'n2', label: 'Num 2', type: 'number', defaultValue: 1 },
    { id: 'd2', label: 'Den 2', type: 'number', defaultValue: 4 },
  ],
  calculate: (inputs) => {
    const n1 = Number(inputs.n1);
    const d1 = Number(inputs.d1);
    const n2 = Number(inputs.n2);
    const d2 = Number(inputs.d2);
    const op = inputs.op;

    if (d1 === 0 || d2 === 0) return { error: 'Denominator cannot be zero' };

    let resN = 0;
    let resD = 1;

    switch (op) {
      case 'add':
        resN = n1 * d2 + n2 * d1;
        resD = d1 * d2;
        break;
      case 'subtract':
        resN = n1 * d2 - n2 * d1;
        resD = d1 * d2;
        break;
      case 'multiply':
        resN = n1 * n2;
        resD = d1 * d2;
        break;
      case 'divide':
        resN = n1 * d2;
        resD = d1 * n2;
        break;
    }

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const common = Math.abs(gcd(resN, resD));
    
    return { 
      num: resN / common, 
      den: resD / common, 
      decimal: resN / resD 
    };
  },
  formatResults: (raw) => {
    if (raw.error) return [{ id: 'err', label: 'Error', value: raw.error, type: 'text' }];
    return [
      { id: 'frac', label: 'Simplified Fraction', value: `${raw.num}/${raw.den}`, type: 'text', highlight: true },
      { id: 'dec', label: 'Decimal Value', value: (raw.decimal as number).toFixed(4), type: 'number' }
    ];
  }
};
