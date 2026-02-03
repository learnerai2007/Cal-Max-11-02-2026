import { CalculatorDef } from '../../types';

export const RETIREMENT_CALC: CalculatorDef = {
  id: 'finance-retirement',
  name: 'Retirement Planner',
  description: 'Estimate your retirement corpus based on current age and savings goal.',
  category: 'Finance',
  icon: 'Palmtree',
  inputs: [
    { id: 'age', label: 'Current Age', type: 'number', defaultValue: 30 },
    { id: 'retireAge', label: 'Retirement Age', type: 'number', defaultValue: 60 },
    { id: 'savings', label: 'Current Monthly Savings', type: 'currency', defaultValue: 1000, unit: '$' },
    { id: 'existing', label: 'Existing Corpus', type: 'currency', defaultValue: 10000, unit: '$' },
    { id: 'rate', label: 'Return Rate (Pre-retirement)', type: 'slider', defaultValue: 8, min: 1, max: 15, unit: '%' },
  ],
  calculate: (inputs) => {
    const currentAge = Number(inputs.age);
    const retireAge = Number(inputs.retireAge);
    const years = retireAge - currentAge;
    const months = years * 12;
    const monthlyRate = (Number(inputs.rate) / 100) / 12;
    const monthlySaving = Number(inputs.savings);
    const corpus = Number(inputs.existing);

    // FV of existing corpus
    const fvExisting = corpus * Math.pow(1 + monthlyRate, months);
    // FV of monthly savings
    const fvSavings = monthlySaving * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalCorpus = fvExisting + fvSavings;

    return { totalCorpus, years, fvExisting, fvSavings };
  },
  formatResults: (raw) => [
    { id: 'total', label: 'Est. Retirement Fund', value: raw.totalCorpus as number, type: 'currency', highlight: true },
    { id: 'years', label: 'Years to Retirement', value: raw.years as number, type: 'number' }
  ]
};