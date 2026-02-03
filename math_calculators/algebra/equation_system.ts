
import { CalculatorDef } from '../../types';

export const EQUATION_SYSTEM_SOLVER: CalculatorDef = {
  id: 'math-eq-system',
  name: 'System Solver (2x2)',
  description: 'Solve a system of two linear equations: a1x + b1y = c1 and a2x + b2y = c2.',
  category: 'Math',
  icon: 'Layers',
  inputs: [
    { id: 'a1', label: 'a1', type: 'number', defaultValue: 1 },
    { id: 'b1', label: 'b1', type: 'number', defaultValue: 1, unit: 'y' },
    { id: 'c1', label: 'c1 (Result)', type: 'number', defaultValue: 5 },
    { id: 'a2', label: 'a2', type: 'number', defaultValue: 1 },
    { id: 'b2', label: 'b2', type: 'number', defaultValue: -1, unit: 'y' },
    { id: 'c2', label: 'c2 (Result)', type: 'number', defaultValue: 1 },
  ],
  calculate: (inputs) => {
    const a1 = Number(inputs.a1), b1 = Number(inputs.b1), c1 = Number(inputs.c1);
    const a2 = Number(inputs.a2), b2 = Number(inputs.b2), c2 = Number(inputs.c2);

    const det = a1 * b2 - a2 * b1;
    if (det === 0) return { error: 'No unique solution' };

    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;

    return { x, y };
  },
  formatResults: (raw) => {
    if (raw.error) return [{ id: 'err', label: 'Status', value: raw.error as string, type: 'text', highlight: true }];
    return [
      { id: 'x', label: 'Value of X', value: (raw.x as number).toFixed(4), type: 'number', highlight: true },
      { id: 'y', label: 'Value of Y', value: (raw.y as number).toFixed(4), type: 'number', highlight: true }
    ];
  }
};
