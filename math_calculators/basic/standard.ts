
import { CalculatorDef } from '../../types';

export const BASIC_ARITHMETIC: CalculatorDef = {
  id: 'math-basic',
  name: 'Normal Calculator',
  description: 'Tactile, real-life calculation experience with high precision and physical feedback.',
  category: 'Math',
  icon: 'Calculator',
  inputs: [
    { id: 'num1', label: 'Value A', type: 'number', defaultValue: 0 },
  ],
  calculate: (inputs) => {
    return { result: Number(inputs.num1) };
  },
  formatResults: (raw) => [
    { id: 'res', label: 'Computed Value', value: Number(raw.result), type: 'number', highlight: true }
  ]
};
