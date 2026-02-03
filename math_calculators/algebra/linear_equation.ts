
import { CalculatorDef } from '../../types';

export const LINEAR_EQUATION_CALCULATOR: CalculatorDef = {
  id: 'algebra-linear',
  name: 'Linear Solver',
  description: 'Find X or Y values for linear equations (y = mx + b).',
  category: 'Math',
  icon: 'GitCommit',
  inputs: [
    { id: 'm', label: 'Slope (m)', type: 'number', defaultValue: 2 },
    { id: 'b', label: 'Intercept (b)', type: 'number', defaultValue: 5 },
    { id: 'x', label: 'Value of X', type: 'number', defaultValue: 10 },
  ],
  calculate: (inputs) => {
    const m = Number(inputs.m);
    const b = Number(inputs.b);
    const x = Number(inputs.x);
    const y = (m * x) + b;
    return { y, m, b, x };
  },
  formatResults: (raw) => [
    { id: 'y', label: 'Result (Y)', value: raw.y as number, type: 'number', highlight: true },
    { id: 'eq', label: 'Equation', value: `y = ${raw.m}x + ${raw.b}`, type: 'text' }
  ],
  getChartData: (raw) => {
    const data = [];
    const m = raw.m as number;
    const b = raw.b as number;
    for (let i = -10; i <= 10; i += 2) {
      data.push({ name: i.toString(), value: (m * i) + b });
    }
    return {
      type: 'area',
      data: data,
      title: 'Linear Progression'
    };
  }
};
