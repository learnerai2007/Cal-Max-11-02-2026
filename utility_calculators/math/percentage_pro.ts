import { CalculatorDef } from '../../types';

export const PERCENTAGE_PRO: CalculatorDef = {
  id: 'utility-percent-pro',
  name: 'Percentage Pro',
  description: 'Solve any percentage problem: increase, decrease, portions, and ratios.',
  category: 'Utility',
  icon: 'Percent',
  inputs: [
    { id: 'mode', label: 'I want to find...', type: 'select', defaultValue: 'of', options: [
      { label: 'X% of Y', value: 'of' },
      { label: 'X is what % of Y', value: 'isWhat' },
      { label: '% Change from X to Y', value: 'change' }
    ]},
    { id: 'val1', label: 'Value X', type: 'number', defaultValue: 20 },
    { id: 'val2', label: 'Value Y', type: 'number', defaultValue: 200 },
  ],
  calculate: (inputs) => {
    const x = Number(inputs.val1);
    const y = Number(inputs.val2);
    const mode = inputs.mode;
    let result = 0;

    if (mode === 'of') result = (x / 100) * y;
    else if (mode === 'isWhat') result = (x / y) * 100;
    else if (mode === 'change') result = ((y - x) / x) * 100;

    return { result, mode };
  },
  formatResults: (raw) => {
    const isPct = raw.mode !== 'of';
    return [
      { id: 'res', label: 'Result', value: (raw.result as number).toFixed(2), type: isPct ? 'percent' : 'number', highlight: true }
    ];
  },
  getChartData: (raw) => {
    if (raw.mode === 'of') {
      return {
        type: 'pie',
        data: [
          { name: 'Portion', value: raw.result as number, fill: '#6366f1' },
          { name: 'Remainder', value: 100 - (raw.result as number), fill: '#1e293b' }
        ]
      };
    }
    return null;
  }
};