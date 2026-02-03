import { CalculatorDef } from '../types';

export const UTILITY_CALCULATORS: CalculatorDef[] = [
  {
    id: 'date-difference',
    name: 'Date Difference',
    description: 'Calculate the number of days, months, and years between two dates.',
    category: 'Utility',
    icon: 'Calendar',
    inputs: [
      { id: 'start', label: 'Start Date', type: 'date', defaultValue: '2023-01-01' },
      { id: 'end', label: 'End Date', type: 'date', defaultValue: '2023-12-31' },
    ],
    calculate: (inputs) => {
      const d1 = new Date(inputs.start as string);
      const d2 = new Date(inputs.end as string);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { days: diffDays, weeks: (diffDays / 7).toFixed(1) };
    },
    formatResults: (raw) => [
      { id: 'days', label: 'Total Days', value: raw.days as number, type: 'number', highlight: true },
      { id: 'weeks', label: 'Total Weeks', value: raw.weeks as string, type: 'text' }
    ]
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Quickly convert between common units of length, weight, and temp.',
    category: 'Utility',
    icon: 'Scale',
    inputs: [
      { id: 'val', label: 'Value', type: 'number', defaultValue: 1 },
      { id: 'from', label: 'From Unit', type: 'select', defaultValue: 'm', options: [
        {label: 'Meters (m)', value: 'm'},
        {label: 'Feet (ft)', value: 'ft'},
        {label: 'Kilograms (kg)', value: 'kg'},
        {label: 'Pounds (lb)', value: 'lb'}
      ]},
    ],
    calculate: (inputs) => {
      const v = Number(inputs.val);
      const from = inputs.from;
      let res = 0;
      let toUnit = '';
      if (from === 'm') { res = v * 3.28084; toUnit = 'ft'; }
      else if (from === 'ft') { res = v / 3.28084; toUnit = 'm'; }
      else if (from === 'kg') { res = v * 2.20462; toUnit = 'lb'; }
      else if (from === 'lb') { res = v / 2.20462; toUnit = 'kg'; }
      return { res, toUnit };
    },
    formatResults: (raw) => [
      { id: 'res', label: 'Converted Value', value: (raw.res as number).toFixed(2), type: 'text', unit: raw.toUnit as string, highlight: true }
    ]
  }
];