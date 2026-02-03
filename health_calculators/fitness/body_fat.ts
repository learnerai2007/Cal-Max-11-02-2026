
import { CalculatorDef } from '../../types';

export const BODY_FAT_CALC: CalculatorDef = {
  id: 'health-body-fat',
  name: 'Body Fat Estimator',
  description: 'Estimate body fat percentage using the US Navy Method (requires measurements).',
  category: 'Health',
  icon: 'Activity',
  inputs: [
    { id: 'gender', label: 'Gender', type: 'select', defaultValue: 'male', options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}] },
    { id: 'height', label: 'Height', type: 'number', defaultValue: 175, unit: 'cm' },
    { id: 'neck', label: 'Neck Cir.', type: 'number', defaultValue: 38, unit: 'cm' },
    { id: 'waist', label: 'Waist Cir.', type: 'number', defaultValue: 85, unit: 'cm' },
    { id: 'hips', label: 'Hips Cir. (Female Only)', type: 'number', defaultValue: 90, unit: 'cm' },
  ],
  calculate: (inputs) => {
    const h = Number(inputs.height);
    const n = Number(inputs.neck);
    const w = Number(inputs.waist);
    const hp = Number(inputs.hips);
    const gender = inputs.gender;

    let bf = 0;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
    }

    return { bf, lbm: 100 - bf };
  },
  formatResults: (raw) => [
    { id: 'bf', label: 'Est. Body Fat %', value: Math.max(0, raw.bf as number).toFixed(1), type: 'percent', highlight: true },
    { id: 'lbm', label: 'Lean Body Mass %', value: Math.min(100, raw.lbm as number).toFixed(1), type: 'percent' }
  ],
  getChartData: (raw) => ({
    type: 'pie',
    data: [
      { name: 'Fat Mass', value: raw.bf as number, fill: '#ef4444' },
      { name: 'Lean Mass', value: raw.lbm as number, fill: '#10b981' }
    ]
  })
};
