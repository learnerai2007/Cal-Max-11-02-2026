import { CalculatorDef } from '../../types';

export const LOAN_EMI_CALC: CalculatorDef = {
  id: 'finance-loan-emi',
  name: 'Loan EMI Solver',
  description: 'Calculate monthly installments for personal, car, or student loans.',
  category: 'Finance',
  icon: 'CreditCard',
  inputs: [
    { id: 'amount', label: 'Loan Amount', type: 'currency', defaultValue: 10000, unit: '$' },
    { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 10, min: 1, max: 25, step: 0.1, unit: '%' },
    { id: 'tenure', label: 'Tenure (Months)', type: 'number', defaultValue: 24, unit: 'mo' },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.amount);
    const r = (Number(inputs.rate) / 100) / 12;
    const n = Number(inputs.tenure);
    
    const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const totalPayable = emi * n;
    const totalInterest = totalPayable - p;
    
    return { emi, totalPayable, totalInterest, principal: p };
  },
  formatResults: (raw) => [
    { id: 'emi', label: 'Monthly EMI', value: raw.emi as number, type: 'currency', highlight: true },
    { id: 'interest', label: 'Total Interest', value: raw.totalInterest as number, type: 'currency' },
    { id: 'total', label: 'Total Payable', value: raw.totalPayable as number, type: 'currency' }
  ],
  getChartData: (raw) => ({
    type: 'pie',
    data: [
      { name: 'Principal', value: raw.principal as number, fill: '#6366f1' },
      { name: 'Interest', value: raw.totalInterest as number, fill: '#f43f5e' }
    ],
    title: 'Payment Breakdown'
  })
};