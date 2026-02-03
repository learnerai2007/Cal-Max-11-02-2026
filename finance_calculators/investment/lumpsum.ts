import { CalculatorDef } from '../../types';

export const LUMPSUM_CALC: CalculatorDef = {
  id: 'finance-lumpsum',
  name: 'Lumpsum Projection',
  description: 'Calculate the future value of a one-time investment over time.',
  category: 'Finance',
  icon: 'BadgeDollarSign',
  inputs: [
    { id: 'initial', label: 'Investment Amount', type: 'currency', defaultValue: 5000, unit: '$' },
    { id: 'rate', label: 'Expected Return (p.a)', type: 'slider', defaultValue: 10, min: 1, max: 30, unit: '%' },
    { id: 'years', label: 'Duration (Years)', type: 'number', defaultValue: 10, unit: 'yr' },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.initial);
    const r = Number(inputs.rate) / 100;
    const n = Number(inputs.years);
    const fv = p * Math.pow(1 + r, n);
    return { fv, invested: p, wealth: fv - p };
  },
  formatResults: (raw) => [
    { id: 'fv', label: 'Future Wealth', value: raw.fv as number, type: 'currency', highlight: true },
    { id: 'wealth', label: 'Est. Returns', value: raw.wealth as number, type: 'currency' }
  ]
};