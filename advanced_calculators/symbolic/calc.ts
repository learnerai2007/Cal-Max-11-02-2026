
import { CalculatorDef } from '../../types';

export const SYMBOLIC_MATH: CalculatorDef = {
  id: 'advanced-symbolic',
  name: 'Symbolic Processor',
  description: 'Simplified symbolic manipulation engine for polynomials and derivatives.',
  category: 'Advanced',
  icon: 'Sigma',
  inputs: [
    { id: 'expression', label: 'Polynomial (ax^n)', type: 'text', defaultValue: '3x^2 + 2x + 5' },
    { id: 'operation', label: 'Action', type: 'select', defaultValue: 'diff', options: [
      { label: 'Differentiate (d/dx)', value: 'diff' },
      { label: 'Integration (Simple)', value: 'int' }
    ]},
  ],
  calculate: (inputs) => {
    const expr = (inputs.expression as string).replace(/\s+/g, '');
    const op = inputs.operation;
    
    // Simple heuristic parser for ax^n + bx + c
    // Note: In a real world app, we'd use MathJS or similar.
    // For this build, we implement a regex-based power rule.
    const terms = expr.split(/(?=[+-])/);
    
    let result = '';
    if (op === 'diff') {
      result = terms.map(term => {
        const match = term.match(/([+-]?\d*)x\^?(\d*)/);
        if (!match) return '';
        const coeff = parseInt(match[1] || '1');
        const pow = parseInt(match[2] || '1');
        if (pow === 0) return '';
        const newCoeff = coeff * pow;
        const newPow = pow - 1;
        if (newPow === 0) return `${newCoeff > 0 ? '+' : ''}${newCoeff}`;
        return `${newCoeff > 0 ? '+' : ''}${newCoeff}x${newPow > 1 ? '^' + newPow : ''}`;
      }).join('');
    } else {
      result = '∫ ' + expr + ' dx + C';
    }

    return { result: result || '0', original: expr };
  },
  formatResults: (raw) => [
    { id: 'res', label: 'Symbolic Result', value: raw.result as string, type: 'text', highlight: true },
    { id: 'orig', label: 'Input Expression', value: raw.original as string, type: 'text' }
  ]
};
