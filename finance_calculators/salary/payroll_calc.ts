import { CalculatorDef } from '../../types';

export const PAYROLL_CALC: CalculatorDef = {
  id: 'finance-payroll',
  name: 'Payroll & Net Pay',
  description: 'Calculate net take-home salary after generic tax and deductions.',
  category: 'Finance',
  icon: 'Banknote',
  inputs: [
    { id: 'gross', label: 'Monthly Gross', type: 'currency', defaultValue: 5000, unit: '$' },
    { id: 'taxRate', label: 'Income Tax Rate', type: 'slider', defaultValue: 20, min: 0, max: 50, unit: '%' },
    { id: 'health', label: 'Health Insurance', type: 'currency', defaultValue: 200, unit: '$' },
    { id: 'pension', label: 'Pension/401k %', type: 'slider', defaultValue: 5, min: 0, max: 20, unit: '%' },
  ],
  calculate: (inputs) => {
    const gross = Number(inputs.gross);
    const tax = gross * (Number(inputs.taxRate) / 100);
    const pension = gross * (Number(inputs.pension) / 100);
    const insurance = Number(inputs.health);
    
    const deductions = tax + pension + insurance;
    const net = gross - deductions;
    
    return { net, tax, pension, insurance, deductions };
  },
  formatResults: (raw) => [
    { id: 'net', label: 'Monthly Take-Home', value: raw.net as number, type: 'currency', highlight: true },
    { id: 'ded', label: 'Total Deductions', value: raw.deductions as number, type: 'currency' }
  ],
  getChartData: (raw) => ({
    type: 'pie',
    data: [
      { name: 'Net Salary', value: raw.net as number, fill: '#10b981' },
      { name: 'Tax', value: raw.tax as number, fill: '#ef4444' },
      { name: 'Pension', value: raw.pension as number, fill: '#6366f1' },
      { name: 'Insurance', value: raw.insurance as number, fill: '#f59e0b' }
    ]
  })
};