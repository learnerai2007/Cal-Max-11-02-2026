
import { CalculatorDef } from '../../types';

export const MONTE_CARLO_SIM: CalculatorDef = {
  id: 'advanced-monte-carlo',
  name: 'Monte Carlo Simulator',
  description: 'Simulate 1,000+ iterations to predict outcomes under uncertainty and volatility.',
  category: 'Advanced',
  icon: 'Dices',
  inputs: [
    { id: 'start', label: 'Starting Capital', type: 'currency', defaultValue: 10000 },
    { id: 'growth', label: 'Expected Growth', type: 'slider', defaultValue: 7, min: -10, max: 25, unit: '%' },
    { id: 'vol', label: 'Volatility (Std Dev)', type: 'slider', defaultValue: 15, min: 0, max: 50, unit: '%' },
    { id: 'years', label: 'Time Horizon', type: 'number', defaultValue: 20 },
  ],
  calculate: (inputs) => {
    const trials = 1000;
    const years = Number(inputs.years);
    const capital = Number(inputs.start);
    const mu = Number(inputs.growth) / 100;
    const sigma = Number(inputs.vol) / 100;

    const outcomes: number[] = [];
    
    // Normal distribution random (Box-Muller)
    const randomNormal = () => {
      const u = 1 - Math.random();
      const v = 1 - Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    for (let i = 0; i < trials; i++) {
      let current = capital;
      for (let y = 0; y < years; y++) {
        const annualReturn = mu + sigma * randomNormal();
        current *= (1 + annualReturn);
      }
      outcomes.push(current);
    }

    outcomes.sort((a, b) => a - b);
    
    return {
      p10: outcomes[Math.floor(trials * 0.1)],
      p50: outcomes[Math.floor(trials * 0.5)],
      p90: outcomes[Math.floor(trials * 0.9)],
      best: outcomes[trials - 1]
    };
  },
  formatResults: (raw) => [
    { id: 'p50', label: 'Median Outcome', value: raw.p50 as number, type: 'currency', highlight: true },
    { id: 'p10', label: 'Bear Case (10th Pct)', value: raw.p10 as number, type: 'currency' },
    { id: 'p90', label: 'Bull Case (90th Pct)', value: raw.p90 as number, type: 'currency' }
  ],
  getChartData: (raw) => ({
    type: 'area',
    data: [
      { name: 'Bear (10%)', value: raw.p10 as number },
      { name: 'Median (50%)', value: raw.p50 as number },
      { name: 'Bull (90%)', value: raw.p90 as number }
    ],
    title: 'Probability Distribution of Outcomes'
  })
};
