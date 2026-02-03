
import { CalculatorDef } from '../../types';

export const SCENARIO_COMPARISON: CalculatorDef = {
  id: 'advanced-comparison',
  name: 'Scenario Benchmarker',
  description: 'Compare two distinct financial or scientific scenarios side-by-side.',
  category: 'Advanced',
  icon: 'Columns2',
  inputs: [
    { id: 'baseVal', label: 'Principal / Base', type: 'currency', defaultValue: 10000 },
    { id: 'rateA', label: 'Rate A (%)', type: 'number', defaultValue: 5 },
    { id: 'rateB', label: 'Rate B (%)', type: 'number', defaultValue: 7 },
    { id: 'years', label: 'Horizon (Years)', type: 'number', defaultValue: 10 },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.baseVal);
    const rA = Number(inputs.rateA) / 100;
    const rB = Number(inputs.rateB) / 100;
    const t = Number(inputs.years);

    const resA = p * Math.pow(1 + rA, t);
    const resB = p * Math.pow(1 + rB, t);
    const delta = resB - resA;

    return { resA, resB, delta, t };
  },
  formatResults: (raw) => [
    { id: 'delta', label: 'Variance (B - A)', value: raw.delta as number, type: 'currency', highlight: true },
    { id: 'a', label: 'Result Scenario A', value: raw.resA as number, type: 'currency' },
    { id: 'b', label: 'Result Scenario B', value: raw.resB as number, type: 'currency' }
  ],
  getChartData: (raw) => ({
    type: 'bar',
    data: [
      { name: 'Scenario A', value: raw.resA as number, fill: '#6366f1' },
      { name: 'Scenario B', value: raw.resB as number, fill: '#f43f5e' }
    ],
    title: `Comparison over ${raw.t} Years`
  })
};
