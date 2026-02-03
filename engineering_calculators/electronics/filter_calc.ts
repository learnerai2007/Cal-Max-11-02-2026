
import { CalculatorDef } from '../../types';

export const RC_FILTER_CALC: CalculatorDef = {
  id: 'electronics-rc-filter',
  name: 'RC Filter Designer',
  description: 'Calculate cutoff frequency and time constant for passive RC filters.',
  category: 'Engineering',
  icon: 'ZapOff',
  inputs: [
    { id: 'resistance', label: 'Resistance (R)', type: 'number', defaultValue: 10, unit: 'kΩ' },
    { id: 'capacitance', label: 'Capacitance (C)', type: 'number', defaultValue: 100, unit: 'nF' },
  ],
  calculate: (inputs) => {
    const r = Number(inputs.resistance) * 1000;
    const c = Number(inputs.capacitance) * 1e-9;

    const tc = r * c;
    const cutoff = 1 / (2 * Math.PI * r * c);

    return { tc, cutoff };
  },
  formatResults: (raw) => [
    { id: 'cutoff', label: 'Cutoff Frequency', value: (raw.cutoff as number).toFixed(2), type: 'number', unit: 'Hz', highlight: true },
    { id: 'tc', label: 'Time Constant (τ)', value: (raw.tc as number * 1000).toFixed(3), type: 'number', unit: 'ms' }
  ]
};
