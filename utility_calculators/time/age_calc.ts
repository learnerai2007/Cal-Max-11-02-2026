import { CalculatorDef } from '../../types';

export const AGE_CALCULATOR: CalculatorDef = {
  id: 'utility-age-calc',
  name: 'Age Calculator',
  description: 'Calculate your exact age in years, months, and days, including your next birthday countdown.',
  category: 'Utility',
  icon: 'User',
  inputs: [
    { id: 'dob', label: 'Date of Birth', type: 'date', defaultValue: '1995-01-01' },
    { id: 'today', label: 'Age at Date of', type: 'date', defaultValue: new Date().toISOString().split('T')[0] },
  ],
  calculate: (inputs) => {
    const birth = new Date(inputs.dob as string);
    const target = new Date(inputs.today as string);

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Next Birthday
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const diffTime = nextBday.getTime() - target.getTime();
    const daysToBday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { years, months, days, daysToBday, totalDays: Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)) };
  },
  formatResults: (raw) => [
    { id: 'age', label: 'Exact Age', value: `${raw.years}y ${raw.months}m ${raw.days}d`, type: 'text', highlight: true },
    { id: 'next', label: 'Next Birthday In', value: raw.daysToBday as number, type: 'number', unit: 'Days' },
    { id: 'total', label: 'Total Days Lived', value: (raw.totalDays as number).toLocaleString(), type: 'text' }
  ],
  getChartData: (raw) => ({
    type: 'pie',
    data: [
      { name: 'Months Passed', value: Number(raw.months), fill: '#6366f1' },
      { name: 'Remaining in Year', value: 12 - Number(raw.months), fill: '#1e293b' }
    ],
    title: 'Year Progress'
  })
};