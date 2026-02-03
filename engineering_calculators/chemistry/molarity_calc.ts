
import { CalculatorDef } from '../../types';

export const MOLARITY_CALC: CalculatorDef = {
  id: 'chem-molarity',
  name: 'Molarity & Moles',
  description: 'Calculate concentration, substance amount, or mass for chemical solutions.',
  category: 'Engineering',
  icon: 'Beaker',
  inputs: [
    { id: 'mass', label: 'Solute Mass', type: 'number', defaultValue: 58.44, unit: 'g' },
    { id: 'molarMass', label: 'Molar Mass', type: 'number', defaultValue: 58.44, unit: 'g/mol', description: 'e.g., NaCl is 58.44' },
    { id: 'volume', label: 'Solution Volume', type: 'number', defaultValue: 1000, unit: 'mL' },
  ],
  calculate: (inputs) => {
    const mass = Number(inputs.mass);
    const mm = Number(inputs.molarMass);
    const volL = Number(inputs.volume) / 1000;

    const moles = mass / mm;
    const molarity = moles / volL;

    return { moles, molarity };
  },
  formatResults: (raw) => [
    { id: 'molarity', label: 'Concentration', value: (raw.molarity as number).toFixed(4), type: 'number', unit: 'M (mol/L)', highlight: true },
    { id: 'moles', label: 'Amount of Substance', value: (raw.moles as number).toFixed(4), type: 'number', unit: 'mol' }
  ]
};
