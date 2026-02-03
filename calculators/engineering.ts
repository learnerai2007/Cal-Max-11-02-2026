import { CalculatorDef } from '../types';

export const ENGINEERING_CALCULATORS: CalculatorDef[] = [
  {
    id: 'ohms-law',
    name: "Ohm's Law",
    description: 'Calculate Voltage, Current, or Resistance using Ohm\'s Law (V = I * R).',
    category: 'Engineering',
    icon: 'Cpu',
    inputs: [
      { id: 'mode', label: 'Solve For', type: 'select', defaultValue: 'v', options: [
        {label: 'Voltage (V)', value: 'v'},
        {label: 'Current (I)', value: 'i'},
        {label: 'Resistance (R)', value: 'r'}
      ]},
      { id: 'val1', label: 'Value 1', type: 'number', defaultValue: 10 },
      { id: 'val2', label: 'Value 2', type: 'number', defaultValue: 2 },
    ],
    calculate: (inputs) => {
      const mode = inputs.mode;
      const v1 = Number(inputs.val1);
      const v2 = Number(inputs.val2);
      let v = 0, i = 0, r = 0, p = 0;
      
      if (mode === 'v') { i = v1; r = v2; v = i * r; }
      else if (mode === 'i') { v = v1; r = v2; i = v / r; }
      else { v = v1; i = v2; r = v / i; }
      
      p = v * i;
      return { v, i, r, p };
    },
    formatResults: (raw) => [
      { id: 'v', label: 'Voltage', value: (raw.v as number).toFixed(2), type: 'number', unit: 'V' },
      { id: 'i', label: 'Current', value: (raw.i as number).toFixed(2), type: 'number', unit: 'A' },
      { id: 'r', label: 'Resistance', value: (raw.r as number).toFixed(2), type: 'number', unit: 'Ω', highlight: true },
      { id: 'p', label: 'Power', value: (raw.p as number).toFixed(2), type: 'number', unit: 'W' }
    ]
  },
  {
    id: 'resistor-color',
    name: 'Resistor Color Code',
    description: 'Convert color bands to resistance values.',
    category: 'Engineering',
    icon: 'Layers',
    inputs: [
      { id: 'band1', label: '1st Band', type: 'select', defaultValue: '1', options: [{label: 'Brown', value: '1'}, {label: 'Red', value: '2'}, {label: 'Orange', value: '3'}] },
      { id: 'band2', label: '2nd Band', type: 'select', defaultValue: '0', options: [{label: 'Black', value: '0'}, {label: 'Brown', value: '1'}, {label: 'Red', value: '2'}] },
      { id: 'mult', label: 'Multiplier', type: 'select', defaultValue: '100', options: [{label: '100 Ω', value: '100'}, {label: '1k Ω', value: '1000'}] }
    ],
    calculate: (inputs) => {
      const res = (Number(inputs.band1) * 10 + Number(inputs.band2)) * Number(inputs.mult);
      return { res };
    },
    formatResults: (raw) => [
      { id: 'res', label: 'Resistance', value: raw.res as number, type: 'number', unit: 'Ω', highlight: true }
    ]
  }
];