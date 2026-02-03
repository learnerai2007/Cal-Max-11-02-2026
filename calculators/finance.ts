import { CalculatorDef } from '../types';

export const FINANCE_CALCULATORS: CalculatorDef[] = [
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Estimate monthly mortgage payments including taxes and insurance.',
    category: 'Finance',
    icon: 'Home',
    inputs: [
      { id: 'homeValue', label: 'Home Value', type: 'currency', defaultValue: 300000, unit: '$' },
      { id: 'downPayment', label: 'Down Payment', type: 'currency', defaultValue: 60000, unit: '$' },
      { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 6.5, min: 0.1, max: 20, step: 0.1, unit: '%' },
      { id: 'term', label: 'Loan Term', type: 'select', defaultValue: 30, options: [{label: '30 Years', value: 30}, {label: '15 Years', value: 15}, {label: '10 Years', value: 10}] },
      { id: 'propertyTax', label: 'Yearly Property Tax', type: 'currency', defaultValue: 3000, unit: '$' },
    ],
    calculate: (inputs) => {
      const p = Number(inputs.homeValue) - Number(inputs.downPayment);
      const r = (Number(inputs.rate) / 100) / 12;
      const n = Number(inputs.term) * 12;
      const emi = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const monthlyTax = Number(inputs.propertyTax) / 12;
      return { monthlyPayment: emi + monthlyTax, principalInterest: emi, tax: monthlyTax, totalLoan: p };
    },
    formatResults: (raw) => [
      { id: 'total', label: 'Total Monthly', value: raw.monthlyPayment as number, type: 'currency', highlight: true },
      { id: 'pi', label: 'P & I', value: raw.principalInterest as number, type: 'currency' },
      { id: 'tax', label: 'Taxes', value: raw.tax as number, type: 'currency' }
    ],
    getChartData: (raw) => ({
      type: 'pie',
      data: [
        { name: 'P & I', value: raw.principalInterest as number, fill: '#6366f1' },
        { name: 'Property Tax', value: raw.tax as number, fill: '#94a3b8' }
      ]
    })
  },
  {
    id: 'sip-calculator',
    name: 'SIP Calculator',
    description: 'Calculate the future value of Systematic Investment Plan (SIP) payments.',
    category: 'Finance',
    icon: 'TrendingUp',
    inputs: [
      { id: 'monthly', label: 'Monthly Investment', type: 'currency', defaultValue: 500, unit: '$' },
      { id: 'rate', label: 'Expected Return', type: 'slider', defaultValue: 12, min: 1, max: 30, unit: '%' },
      { id: 'years', label: 'Investment Period', type: 'slider', defaultValue: 10, min: 1, max: 40, unit: 'Years' },
    ],
    calculate: (inputs) => {
      const p = Number(inputs.monthly);
      const r = (Number(inputs.rate) / 100) / 12;
      const n = Number(inputs.years) * 12;
      const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = p * n;
      return { futureValue: fv, invested, wealthGained: fv - invested };
    },
    formatResults: (raw) => [
      { id: 'fv', label: 'Expected Amount', value: raw.futureValue as number, type: 'currency', highlight: true },
      { id: 'inv', label: 'Invested Amount', value: raw.invested as number, type: 'currency' },
      { id: 'gain', label: 'Wealth Gained', value: raw.wealthGained as number, type: 'currency' }
    ]
  },
  {
    id: 'cagr-calculator',
    name: 'CAGR Calculator',
    description: 'Compound Annual Growth Rate of your investments.',
    category: 'Finance',
    icon: 'BarChart3',
    inputs: [
      { id: 'initial', label: 'Initial Value', type: 'currency', defaultValue: 1000, unit: '$' },
      { id: 'final', label: 'Final Value', type: 'currency', defaultValue: 2500, unit: '$' },
      { id: 'years', label: 'Duration', type: 'number', defaultValue: 5, unit: 'Years' },
    ],
    calculate: (inputs) => {
      const cagr = (Math.pow((Number(inputs.final) / Number(inputs.initial)), (1 / Number(inputs.years))) - 1) * 100;
      return { cagr };
    },
    formatResults: (raw) => [
      { id: 'cagr', label: 'Annual Growth Rate', value: raw.cagr as number, type: 'percent', highlight: true }
    ]
  }
];