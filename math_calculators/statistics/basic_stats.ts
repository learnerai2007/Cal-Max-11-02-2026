
import { CalculatorDef } from '../../types';

export const BASIC_STATS_CALCULATOR: CalculatorDef = {
  id: 'stats-basic',
  name: 'Descriptive Statistics',
  description: 'Calculate Mean, Median, Mode, and Standard Deviation for a dataset.',
  category: 'Math',
  icon: 'BarChart3',
  inputs: [
    { 
      id: 'dataset', 
      label: 'Dataset (Comma Separated)', 
      type: 'text', 
      defaultValue: '10, 20, 30, 40, 50', 
      description: 'Enter numbers separated by commas' 
    },
  ],
  calculate: (inputs) => {
    const nums = (inputs.dataset as string)
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (nums.length === 0) return { error: 'Invalid data' };

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    
    const sorted = [...nums].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 
      ? sorted[middle] 
      : (sorted[middle - 1] + sorted[middle]) / 2;

    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    return { mean, median, stdDev, count: nums.length, min: Math.min(...nums), max: Math.max(...nums) };
  },
  formatResults: (raw) => {
    if (raw.error) return [{ id: 'err', label: 'Error', value: raw.error as string, type: 'text' }];
    return [
      { id: 'mean', label: 'Average (Mean)', value: (raw.mean as number).toFixed(2), type: 'number', highlight: true },
      { id: 'med', label: 'Median', value: (raw.median as number).toFixed(2), type: 'number' },
      { id: 'sd', label: 'Std. Deviation', value: (raw.stdDev as number).toFixed(2), type: 'number' },
      { id: 'range', label: 'Range', value: `${raw.min} - ${raw.max}`, type: 'text' }
    ];
  }
};
