
import { CalculatorDef } from '../../types';

export const SLEEP_CALC: CalculatorDef = {
  id: 'health-sleep',
  name: 'Sleep Cycle Solver',
  description: 'Calculate the best times to wake up to avoid grogginess using 90-minute cycles.',
  category: 'Health',
  icon: 'Moon',
  inputs: [
    { id: 'sleepTime', label: 'Planned Bedtime', type: 'text', defaultValue: '22:00', description: 'HH:MM format' },
  ],
  calculate: (inputs) => {
    const [h, m] = (inputs.sleepTime as string).split(':').map(Number);
    const start = new Date();
    start.setHours(h, m, 0);
    
    // Account for 14 minutes average to fall asleep
    const fallAsleepTime = 14;
    
    const wakeTimes = [];
    for (let i = 1; i <= 6; i++) {
      const wake = new Date(start.getTime() + (fallAsleepTime + i * 90) * 60000);
      wakeTimes.push(wake.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }

    return { wakeTimes };
  },
  formatResults: (raw) => [
    { id: 'w1', label: 'Ideal Wake (5 Cycles)', value: (raw.wakeTimes as string[])[4], type: 'text', highlight: true },
    { id: 'w2', label: 'Ideal Wake (6 Cycles)', value: (raw.wakeTimes as string[])[5], type: 'text' },
    { id: 'note', label: 'Tip', value: 'Wake up between cycles to feel refreshed.', type: 'text' }
  ]
};
