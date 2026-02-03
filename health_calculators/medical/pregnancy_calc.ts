
import { CalculatorDef } from '../../types';

export const PREGNANCY_CALC: CalculatorDef = {
  id: 'health-pregnancy',
  name: 'Pregnancy Due Date',
  description: 'Estimate your due date and current gestation period based on your last period.',
  category: 'Health',
  icon: 'Baby',
  inputs: [
    { id: 'lastPeriod', label: 'First Day of Last Period', type: 'date', defaultValue: new Date().toISOString().split('T')[0] },
    { id: 'cycleLength', label: 'Avg Cycle Length', type: 'number', defaultValue: 28, unit: 'days' },
  ],
  calculate: (inputs) => {
    const lmp = new Date(inputs.lastPeriod as string);
    const cycle = Number(inputs.cycleLength);
    
    // Naegele's Rule: LMP + 9 months + 7 days
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280 + (cycle - 28));

    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lmp.getTime());
    const weeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((diffTime / (1000 * 60 * 60 * 24)) % 7);

    return { 
      dueDate: dueDate.toLocaleDateString(), 
      weeks, 
      days,
      progress: (weeks / 40) * 100
    };
  },
  formatResults: (raw) => [
    { id: 'due', label: 'Estimated Due Date', value: raw.dueDate as string, type: 'text', highlight: true },
    { id: 'gest', label: 'Current Gestation', value: `${raw.weeks}w ${raw.days}d`, type: 'text' },
    { id: 'prog', label: 'Pregnancy Progress', value: (raw.progress as number).toFixed(1), type: 'percent' }
  ]
};
