
import { CalculatorDef } from '../../types';

export const STRESS_STRAIN_CALC: CalculatorDef = {
  id: 'mech-stress',
  name: 'Stress & Strain',
  description: 'Calculate normal stress, strain, and Young\'s Modulus for materials.',
  category: 'Engineering',
  icon: 'ArrowDownUp',
  inputs: [
    { id: 'force', label: 'Applied Force (F)', type: 'number', defaultValue: 1000, unit: 'N' },
    { id: 'area', label: 'Cross Section (A)', type: 'number', defaultValue: 50, unit: 'mm²' },
    { id: 'extension', label: 'Extension (ΔL)', type: 'number', defaultValue: 0.1, unit: 'mm' },
    { id: 'origLength', label: 'Original Length (L)', type: 'number', defaultValue: 100, unit: 'mm' },
  ],
  calculate: (inputs) => {
    const f = Number(inputs.force);
    const a = Number(inputs.area);
    const dl = Number(inputs.extension);
    const l = Number(inputs.origLength);

    const stress = f / (a * 1e-6); // Converting mm² to m² for Pascals
    const strain = dl / l;
    const modulus = stress / strain;

    return { stress, strain, modulus };
  },
  formatResults: (raw) => [
    { id: 'stress', label: 'Normal Stress', value: (raw.stress as number / 1e6).toFixed(2), type: 'number', unit: 'MPa', highlight: true },
    { id: 'strain', label: 'Engineering Strain', value: (raw.strain as number).toFixed(5), type: 'number' },
    { id: 'modulus', label: 'Young\'s Modulus', value: (raw.modulus as number / 1e9).toFixed(2), type: 'number', unit: 'GPa' }
  ]
};
