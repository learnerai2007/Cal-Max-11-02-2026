
import { CalculatorDef } from '../../types';

export const CONCRETE_CALC: CalculatorDef = {
  id: 'civil-concrete',
  name: 'Concrete Estimator',
  description: 'Estimate required concrete volume and bag count for slabs or footings.',
  category: 'Engineering',
  icon: 'HardHat',
  inputs: [
    { id: 'length', label: 'Length', type: 'number', defaultValue: 10, unit: 'ft' },
    { id: 'width', label: 'Width', type: 'number', defaultValue: 10, unit: 'ft' },
    { id: 'thickness', label: 'Thickness', type: 'number', defaultValue: 4, unit: 'in' },
    { id: 'bagSize', label: 'Bag Size', type: 'select', defaultValue: '80', options: [
      { label: '80 lb (0.6 ft³)', value: '80' },
      { label: '60 lb (0.45 ft³)', value: '60' },
      { label: '40 lb (0.3 ft³)', value: '40' }
    ]},
  ],
  calculate: (inputs) => {
    const l = Number(inputs.length);
    const w = Number(inputs.width);
    const t = Number(inputs.thickness) / 12;
    const bagYield = Number(inputs.bagSize) === 80 ? 0.6 : (Number(inputs.bagSize) === 60 ? 0.45 : 0.3);

    const volumeFt3 = l * w * t;
    const volumeYd3 = volumeFt3 / 27;
    const bags = Math.ceil(volumeFt3 / bagYield);

    return { volumeFt3, volumeYd3, bags };
  },
  formatResults: (raw) => [
    { id: 'bags', label: 'Bags Required', value: raw.bags as number, type: 'number', unit: 'Bags', highlight: true },
    { id: 'volYd', label: 'Total Volume', value: (raw.volumeYd3 as number).toFixed(2), type: 'number', unit: 'yd³' },
    { id: 'volFt', label: 'Total Volume', value: (raw.volumeFt3 as number).toFixed(2), type: 'number', unit: 'ft³' }
  ]
};
