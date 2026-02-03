
import { CalculatorDef } from '../../types';

export const HEART_RATE_CALC: CalculatorDef = {
  id: 'health-heart-rate',
  name: 'Training Zones',
  description: 'Find your aerobic and anaerobic heart rate zones for optimal workouts.',
  category: 'Health',
  icon: 'HeartPulse',
  inputs: [
    { id: 'age', label: 'Age', type: 'number', defaultValue: 30 },
    { id: 'resting', label: 'Resting HR', type: 'number', defaultValue: 65, unit: 'bpm' },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age);
    const rhr = Number(inputs.resting);
    const mhr = 220 - age;
    const hrr = mhr - rhr;

    const getZone = (pct: number) => Math.round(rhr + (hrr * pct));

    return {
      max: mhr,
      z1: getZone(0.5),
      z2: getZone(0.6),
      z3: getZone(0.7),
      z4: getZone(0.8),
      z5: getZone(0.9)
    };
  },
  formatResults: (raw) => [
    { id: 'max', label: 'Max Heart Rate', value: raw.max as number, type: 'number', unit: 'bpm', highlight: true },
    { id: 'z3', label: 'Aerobic Zone (70%)', value: raw.z3 as number, type: 'number', unit: 'bpm' },
    { id: 'z5', label: 'Red Line (90%)', value: raw.z5 as number, type: 'number', unit: 'bpm' }
  ],
  getChartData: (raw) => ({
    type: 'bar',
    data: [
      { name: 'Recovery', value: raw.z1 as number },
      { name: 'Fat Burn', value: raw.z2 as number },
      { name: 'Aerobic', value: raw.z3 as number },
      { name: 'Anaerobic', value: raw.z4 as number },
      { name: 'VO2 Max', value: raw.z5 as number }
    ],
    title: 'Intensity Zones (bpm)'
  })
};
