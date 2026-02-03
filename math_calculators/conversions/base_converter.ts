
import { CalculatorDef } from '../../types';

export const BASE_CONVERTER: CalculatorDef = {
  id: 'math-base-conv',
  name: 'Base Converter',
  description: 'Convert numbers between Decimal, Binary, Hexadecimal, and Octal bases.',
  category: 'Math',
  icon: 'Binary',
  inputs: [
    { id: 'val', label: 'Input Value', type: 'text', defaultValue: '255' },
    { id: 'fromBase', label: 'Input Base', type: 'select', defaultValue: '10', options: [
      { label: 'Decimal (10)', value: '10' },
      { label: 'Binary (2)', value: '2' },
      { label: 'Hexadecimal (16)', value: '16' },
      { label: 'Octal (8)', value: '8' }
    ]},
  ],
  calculate: (inputs) => {
    const val = String(inputs.val);
    const from = parseInt(inputs.fromBase);
    
    try {
      const dec = parseInt(val, from);
      if (isNaN(dec)) throw new Error('Invalid input');
      
      return {
        dec,
        bin: dec.toString(2),
        hex: dec.toString(16).toUpperCase(),
        oct: dec.toString(8)
      };
    } catch (e) {
      return { error: 'Invalid Number for Base' };
    }
  },
  formatResults: (raw) => {
    if (raw.error) return [{ id: 'err', label: 'Status', value: raw.error, type: 'text' }];
    return [
      { id: 'dec', label: 'Decimal', value: raw.dec as number, type: 'number', highlight: true },
      { id: 'bin', label: 'Binary', value: raw.bin as string, type: 'text' },
      { id: 'hex', label: 'Hexadecimal', value: `0x${raw.hex}`, type: 'text' },
      { id: 'oct', label: 'Octal', value: raw.oct as string, type: 'text' }
    ];
  }
};
