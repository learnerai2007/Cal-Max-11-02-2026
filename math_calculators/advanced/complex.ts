
import { CalculatorDef } from '../../types';

export const COMPLEX_NUMBER_CALC: CalculatorDef = {
  id: 'math-complex',
  name: 'Complex Numbers',
  description: 'Arithmetic for complex numbers in the form a + bi.',
  category: 'Math',
  icon: 'CloudRain',
  inputs: [
    { id: 'r1', label: 'Real 1', type: 'number', defaultValue: 3 },
    { id: 'i1', label: 'Imaginary 1 (i)', type: 'number', defaultValue: 2 },
    { id: 'op', label: 'Operator', type: 'select', defaultValue: 'add', options: [
      { label: 'Add', value: 'add' },
      { label: 'Subtract', value: 'sub' },
      { label: 'Multiply', value: 'mul' }
    ]},
    { id: 'r2', label: 'Real 2', type: 'number', defaultValue: 1 },
    { id: 'i2', label: 'Imaginary 2 (i)', type: 'number', defaultValue: 7 },
  ],
  calculate: (inputs) => {
    const r1 = Number(inputs.r1);
    const i1 = Number(inputs.i1);
    const r2 = Number(inputs.r2);
    const i2 = Number(inputs.i2);
    const op = inputs.op;

    let rr = 0, ri = 0;
    if (op === 'add') { rr = r1 + r2; ri = i1 + i2; }
    else if (op === 'sub') { rr = r1 - r2; ri = i1 - i2; }
    else if (op === 'mul') {
      rr = (r1 * r2) - (i1 * i2);
      ri = (r1 * i2) + (i1 * r2);
    }

    return { rr, ri, mag: Math.sqrt(rr*rr + ri*ri) };
  },
  formatResults: (raw) => [
    { id: 'res', label: 'Resulting Complex', value: `${(raw.rr as number).toFixed(2)} ${ (raw.ri as number) >= 0 ? '+' : '-' } ${Math.abs(raw.ri as number).toFixed(2)}i`, type: 'text', highlight: true },
    { id: 'mag', label: 'Magnitude', value: (raw.mag as number).toFixed(3), type: 'number' }
  ]
};
