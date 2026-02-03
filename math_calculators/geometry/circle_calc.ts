
import { CalculatorDef } from '../../types';

export const CIRCLE_CALCULATOR: CalculatorDef = {
  id: 'geometry-circle',
  name: 'Circle Geometry',
  description: 'Calculate area, circumference, and diameter from a radius or diameter input.',
  category: 'Math',
  icon: 'Circle',
  inputs: [
    { id: 'inputValue', label: 'Value', type: 'number', defaultValue: 5, unit: 'u' },
    { 
      id: 'inputType', 
      label: 'Input Type', 
      type: 'select', 
      defaultValue: 'radius', 
      options: [
        { label: 'Radius', value: 'radius' },
        { label: 'Diameter', value: 'diameter' }
      ] 
    },
  ],
  calculate: (inputs) => {
    const val = Number(inputs.inputValue);
    const r = inputs.inputType === 'radius' ? val : val / 2;
    const diameter = r * 2;
    const area = Math.PI * Math.pow(r, 2);
    const circumference = 2 * Math.PI * r;
    return { r, diameter, area, circumference };
  },
  formatResults: (raw) => [
    { id: 'area', label: 'Area', value: (raw.area as number).toFixed(4), type: 'number', unit: 'u²', highlight: true },
    { id: 'circ', label: 'Circumference', value: (raw.circumference as number).toFixed(4), type: 'number', unit: 'u' },
    { id: 'dia', label: 'Diameter', value: (raw.diameter as number).toFixed(4), type: 'number', unit: 'u' }
  ],
  getChartData: (raw) => ({
    type: 'pie',
    data: [
      { name: 'Radius', value: raw.r as number, fill: '#6366f1' },
      { name: 'Remaining Diameter', value: raw.r as number, fill: '#94a3b8' }
    ],
    title: 'Radius vs Diameter Ratio'
  })
};
