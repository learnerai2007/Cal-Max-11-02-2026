import { CalculatorDef } from '../../types';

export const NPV_CALC: CalculatorDef = {
  id: 'finance-npv',
  name: 'NPV Analyzer',
  description: 'Calculate Net Present Value to evaluate business project profitability.',
  category: 'Finance',
  icon: 'BarChartHorizontal',
  inputs: [
    { id: 'initial', label: 'Initial Investment', type: 'currency', defaultValue: 50000, unit: '$' },
    { id: 'rate', label: 'Discount Rate', type: 'slider', defaultValue: 8, min: 1, max: 20, unit: '%' },
    { id: 'cashflows', label: 'Cashflows (comma separated)', type: 'text', defaultValue: '15000, 20000, 25000, 30000' },
  ],
  calculate: (inputs) => {
    const r = Number(inputs.rate) / 100;
    const initial = Number(inputs.initial);
    const flows = (inputs.cashflows as string).split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    let npv = -initial;
    flows.forEach((flow, t) => {
      npv += flow / Math.pow(1 + r, t + 1);
    });
    
    return { npv, isProfitable: npv > 0 };
  },
  formatResults: (raw) => [
    { id: 'npv', label: 'Net Present Value', value: raw.npv as number, type: 'currency', highlight: true },
    { id: 'status', label: 'Verdict', value: raw.isProfitable ? 'Profitable Project' : 'Loss-Making Project', type: 'text' }
  ]
};