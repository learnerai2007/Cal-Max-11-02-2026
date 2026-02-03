import { CalculatorDef } from '../types';

export const MATH_CALCULATORS: CalculatorDef[] = [
  {
    id: 'quadratic-solver',
    name: 'Quadratic Solver',
    description: 'Solve quadratic equations of the form ax² + bx + c = 0.',
    category: 'Math',
    icon: 'FunctionSquare',
    inputs: [
      { id: 'a', label: 'Value of a', type: 'number', defaultValue: 1 },
      { id: 'b', label: 'Value of b', type: 'number', defaultValue: 5 },
      { id: 'c', label: 'Value of c', type: 'number', defaultValue: 6 },
    ],
    calculate: (inputs) => {
      const a = Number(inputs.a);
      const b = Number(inputs.b);
      const c = Number(inputs.c);
      const d = (b * b) - (4 * a * c);
      if (d < 0) return { error: 'No real roots' };
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      return { x1, x2, d };
    },
    formatResults: (raw) => {
      if (raw.error) return [{ id: 'err', label: 'Status', value: raw.error as string, type: 'text' }];
      return [
        { id: 'x1', label: 'Root X1', value: raw.x1 as number, type: 'number', highlight: true },
        { id: 'x2', label: 'Root X2', value: raw.x2 as number, type: 'number' },
        { id: 'd', label: 'Discriminant', value: raw.d as number, type: 'number' }
      ];
    }
  },
  {
    id: 'percentage-calc',
    name: 'Percentage Change',
    description: 'Calculate percentage increase or decrease between two values.',
    category: 'Math',
    icon: 'Percent',
    inputs: [
      { id: 'v1', label: 'Initial Value', type: 'number', defaultValue: 100 },
      { id: 'v2', label: 'Final Value', type: 'number', defaultValue: 150 },
    ],
    calculate: (inputs) => {
      const v1 = Number(inputs.v1);
      const v2 = Number(inputs.v2);
      const change = ((v2 - v1) / v1) * 100;
      return { change, diff: v2 - v1 };
    },
    formatResults: (raw) => [
      { id: 'pct', label: 'Percentage Change', value: raw.change as number, type: 'percent', highlight: true },
      { id: 'diff', label: 'Absolute Difference', value: raw.diff as number, type: 'number' }
    ]
  }
];