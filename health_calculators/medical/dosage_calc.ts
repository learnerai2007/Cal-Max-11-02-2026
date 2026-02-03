
import { CalculatorDef } from '../../types';

export const DOSAGE_CALC: CalculatorDef = {
  id: 'health-dosage',
  name: 'Dosage Solver',
  description: 'Calculate medical dosage based on patient weight and concentration.',
  category: 'Health',
  icon: 'Pill',
  inputs: [
    { id: 'weight', label: 'Patient Weight', type: 'number', defaultValue: 70, unit: 'kg' },
    { id: 'dose', label: 'Required Dose', type: 'number', defaultValue: 15, unit: 'mg/kg' },
    { id: 'concentration', label: 'Concentration', type: 'number', defaultValue: 100, unit: 'mg/ml' },
  ],
  calculate: (inputs) => {
    const w = Number(inputs.weight);
    const d = Number(inputs.dose);
    const c = Number(inputs.concentration);
    
    const totalMg = w * d;
    const totalMl = totalMg / c;
    
    return { totalMg, totalMl };
  },
  formatResults: (raw) => [
    { id: 'mg', label: 'Total Dosage (mg)', value: raw.totalMg as number, type: 'number', unit: 'mg', highlight: true },
    { id: 'ml', label: 'Volume to Administer', value: (raw.totalMl as number).toFixed(2), type: 'number', unit: 'ml' }
  ]
};
