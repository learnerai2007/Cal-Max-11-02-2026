import { CalculatorDef } from '../../types';

export const US_TAX_CALC: CalculatorDef = {
  id: 'finance-us-tax',
  name: 'US Tax Estimator',
  description: 'Estimated Federal Income Tax for Single Filers based on 2024 brackets.',
  category: 'Finance',
  icon: 'Landmark',
  inputs: [
    { id: 'income', label: 'Annual Gross Income', type: 'currency', defaultValue: 75000, unit: '$' },
    { id: 'deduction', label: 'Standard Deduction', type: 'currency', defaultValue: 14600, unit: '$' },
  ],
  calculate: (inputs) => {
    const gross = Number(inputs.income);
    const ded = Number(inputs.deduction);
    const taxable = Math.max(0, gross - ded);
    
    // 2024 Single Filer Brackets
    const brackets = [
      { cap: 11600, rate: 0.10 },
      { cap: 47150, rate: 0.12 },
      { cap: 100525, rate: 0.22 },
      { cap: 191950, rate: 0.24 },
      { cap: 243725, rate: 0.32 },
      { cap: 609350, rate: 0.35 },
      { cap: Infinity, rate: 0.37 }
    ];

    let tax = 0;
    let prevCap = 0;
    for (const b of brackets) {
      if (taxable > prevCap) {
        const taxableInBracket = Math.min(taxable, b.cap) - prevCap;
        tax += taxableInBracket * b.rate;
        prevCap = b.cap;
      } else break;
    }

    const effectiveRate = taxable > 0 ? (tax / gross) * 100 : 0;
    return { tax, taxable, effectiveRate, net: gross - tax };
  },
  formatResults: (raw) => [
    { id: 'tax', label: 'Est. Federal Tax', value: raw.tax as number, type: 'currency', highlight: true },
    { id: 'net', label: 'Estimated Take-Home', value: raw.net as number, type: 'currency' },
    { id: 'rate', label: 'Effective Rate', value: raw.effectiveRate as number, type: 'percent' }
  ]
};