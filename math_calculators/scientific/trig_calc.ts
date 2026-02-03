
import { CalculatorDef } from '../../types';

export const TRIG_CALCULATOR: CalculatorDef = {
  id: 'math-trig',
  name: 'Trigonometry Solver',
  description: 'Calculate Sin, Cos, Tan and their inverses for any angle.',
  category: 'Math',
  icon: 'Waves',
  inputs: [
    { id: 'angle', label: 'Angle', type: 'number', defaultValue: 45 },
    { id: 'unit', label: 'Unit', type: 'select', defaultValue: 'deg', options: [{label: 'Degrees', value: 'deg'}, {label: 'Radians', value: 'rad'}] },
  ],
  calculate: (inputs) => {
    let angle = Number(inputs.angle);
    if (inputs.unit === 'deg') angle = angle * (Math.PI / 180);
    return {
      sin: Math.sin(angle),
      cos: Math.cos(angle),
      tan: Math.tan(angle)
    };
  },
  formatResults: (raw) => [
    { id: 'sin', label: 'Sine', value: (raw.sin as number).toFixed(4), type: 'number', highlight: true },
    { id: 'cos', label: 'Cosine', value: (raw.cos as number).toFixed(4), type: 'number' },
    { id: 'tan', label: 'Tangent', value: (raw.tan as number).toFixed(4), type: 'number' }
  ]
};
