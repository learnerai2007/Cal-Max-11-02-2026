import { CalculatorDef } from '../../types';

export const CURRENCY_CONVERTER: CalculatorDef = {
  id: 'utility-currency',
  name: 'Currency Pro',
  description: 'Quick currency conversion. Use AI Insights to fetch latest market rates via search.',
  category: 'Utility',
  icon: 'DollarSign',
  inputs: [
    { id: 'amount', label: 'Amount', type: 'currency', defaultValue: 100, unit: '$' },
    { id: 'rate', label: 'Exchange Rate', type: 'number', defaultValue: 1.1, description: 'Enter manually or use AI Fetch' },
    { id: 'fromSymbol', label: 'From', type: 'text', defaultValue: 'USD' },
    { id: 'toSymbol', label: 'To', type: 'text', defaultValue: 'EUR' },
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate);
    return { converted: amount * rate, from: inputs.fromSymbol, to: inputs.toSymbol };
  },
  formatResults: (raw) => [
    { id: 'res', label: 'Converted Amount', value: (raw.converted as number).toFixed(2), type: 'text', unit: raw.to as string, highlight: true },
    { id: 'rate', label: 'Basis', value: `1 ${raw.from} = ${((raw.converted as number) / (raw.amount as number || 1)).toFixed(4)} ${raw.to}`, type: 'text' }
  ]
};