
import { CalculatorDef } from '../../types';

export const GRAPHING_CALC: CalculatorDef = {
  id: 'math-graphing',
  name: '2D Function Plotter',
  description: 'Visualize mathematical functions and identify trends over a coordinate plane.',
  category: 'Math',
  icon: 'Activity',
  inputs: [
    { id: 'fnType', label: 'Function Type', type: 'select', defaultValue: 'linear', options: [
      { label: 'Linear (mx + b)', value: 'linear' },
      { label: 'Quadratic (ax²)', value: 'quadratic' },
      { label: 'Sine Wave', value: 'sine' }
    ]},
    { id: 'paramA', label: 'Coefficient A', type: 'number', defaultValue: 1 },
    { id: 'paramB', label: 'Constant B', type: 'number', defaultValue: 0 },
    { id: 'range', label: 'X Range', type: 'slider', defaultValue: 10, min: 5, max: 50 },
  ],
  calculate: (inputs) => {
    const type = inputs.fnType;
    const a = Number(inputs.paramA);
    const b = Number(inputs.paramB);
    const range = Number(inputs.range);
    
    const points = [];
    for (let x = -range; x <= range; x += range / 10) {
      let y = 0;
      if (type === 'linear') y = a * x + b;
      else if (type === 'quadratic') y = a * (x * x) + b;
      else if (type === 'sine') y = a * Math.sin(x) + b;
      points.push({ x: x.toFixed(1), y: y });
    }
    return { points, type };
  },
  formatResults: (raw) => [
    { id: 'status', label: 'Plotting Status', value: `Rendering ${raw.type} function...`, type: 'text', highlight: true }
  ],
  getChartData: (raw) => ({
    type: 'area',
    data: (raw.points as any[]).map(p => ({ name: p.x, value: p.y })),
    title: 'Function Visualization (Y over X)'
  })
};
