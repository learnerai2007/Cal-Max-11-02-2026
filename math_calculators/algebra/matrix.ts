
import { CalculatorDef, CalculatorResult } from '../../types';

export const MATRIX_CALCULATOR: CalculatorDef = {
  id: 'math-matrix',
  name: 'Matrix Operations',
  description: 'Calculate 2x2 Matrix Determinants, Inverses, and Trace values.',
  category: 'Math',
  icon: 'Grid',
  inputs: [
    { id: 'a11', label: 'A (1,1)', type: 'number', defaultValue: 1 },
    { id: 'a12', label: 'A (1,2)', type: 'number', defaultValue: 2 },
    { id: 'a21', label: 'A (2,1)', type: 'number', defaultValue: 3 },
    { id: 'a22', label: 'A (2,2)', type: 'number', defaultValue: 4 },
  ],
  calculate: (inputs) => {
    const a = Number(inputs.a11);
    const b = Number(inputs.a12);
    const c = Number(inputs.a21);
    const d = Number(inputs.a22);

    const det = (a * d) - (b * c);
    const trace = a + d;
    const inv = det !== 0 ? {
      a11: d / det,
      a12: -b / det,
      a21: -c / det,
      a22: a / det
    } : null;

    return { det, trace, inv };
  },
  formatResults: (raw) => {
    // Fix: Explicitly type results array to prevent narrow inference (number only) when pushing string values later.
    const results: CalculatorResult[] = [
      { id: 'det', label: 'Determinant', value: raw.det as number, type: 'number', highlight: true },
      { id: 'trace', label: 'Trace', value: raw.trace as number, type: 'number' }
    ];
    if (raw.inv) {
      const i = raw.inv as any;
      results.push({ id: 'inv', label: 'Inverse Matrix', value: `[${i.a11.toFixed(2)}, ${i.a12.toFixed(2)}] [${i.a21.toFixed(2)}, ${i.a22.toFixed(2)}]`, type: 'text' });
    } else {
      results.push({ id: 'inv', label: 'Inverse', value: 'Singular Matrix (No Inverse)', type: 'text' });
    }
    return results;
  }
};
