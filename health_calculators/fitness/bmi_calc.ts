
import { CalculatorDef } from '../../types';

export const BMI_CALC: CalculatorDef = {
  id: 'health-bmi',
  name: 'BMI Index Solver',
  description: 'Calculate your Body Mass Index and see where you fall on the WHO health scale.',
  category: 'Health',
  icon: 'Scale',
  inputs: [
    { id: 'weight', label: 'Weight', type: 'number', defaultValue: 70, unit: 'kg' },
    { id: 'height', label: 'Height', type: 'number', defaultValue: 175, unit: 'cm' },
  ],
  calculate: (inputs) => {
    const w = Number(inputs.weight);
    const h = Number(inputs.height) / 100;
    const bmi = w / (h * h);
    
    let category = '';
    let color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = '#38bdf8'; }
    else if (bmi < 25) { category = 'Normal Weight'; color = '#10b981'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
    else { category = 'Obese'; color = '#ef4444'; }

    return { bmi, category, color };
  },
  formatResults: (raw) => [
    { id: 'bmi', label: 'Your BMI', value: (raw.bmi as number).toFixed(1), type: 'number', highlight: true },
    { id: 'cat', label: 'Classification', value: raw.category as string, type: 'text' }
  ],
  getChartData: (raw) => ({
    type: 'pie',
    data: [
      { name: 'Your BMI', value: raw.bmi as number, fill: raw.color as string },
      { name: 'Ideal Range', value: 25, fill: '#1e293b' }
    ],
    title: 'BMI Status Visualization'
  })
};
