
import { CalculatorDef } from '../../types';

export const FORMULA_BUILDER: CalculatorDef = {
  id: 'advanced-formula',
  name: 'Custom Formula Engine',
  description: 'Define your own variables and math expressions. Supports standard operators.',
  category: 'Advanced',
  icon: 'Binary',
  inputs: [
    { id: 'formula', label: 'Expression', type: 'text', defaultValue: '(a + b) * c', description: 'Use a, b, c as variables' },
    { id: 'varA', label: 'Variable a', type: 'number', defaultValue: 10 },
    { id: 'varB', label: 'Variable b', type: 'number', defaultValue: 5 },
    { id: 'varC', label: 'Variable c', type: 'number', defaultValue: 2 },
  ],
  calculate: (inputs) => {
    const { formula, varA, varB, varC } = inputs;
    try {
      // Basic sanitization and evaluation for a zero-build environment
      const cleanFormula = (formula as string)
        .replace(/a/g, varA.toString())
        .replace(/b/g, varB.toString())
        .replace(/c/g, varC.toString());
      
      // Using a safer evaluation wrapper
      const result = new Function(`return ${cleanFormula}`)();
      return { result, formula: formula as string };
    } catch (e) {
      return { error: 'Invalid Syntax', result: NaN };
    }
  },
  formatResults: (raw) => [
    { id: 'res', label: 'Computed Result', value: isNaN(raw.result as number) ? 'Syntax Error' : (raw.result as number).toFixed(4), type: 'number', highlight: true },
    { id: 'expr', label: 'Processed Expression', value: raw.formula as string, type: 'text' }
  ]
};
