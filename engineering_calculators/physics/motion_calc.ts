
import { CalculatorDef } from '../../types';

export const PROJECTILE_MOTION_CALC: CalculatorDef = {
  id: 'physics-projectile',
  name: 'Projectile Motion',
  description: 'Calculate range, maximum height, and time of flight for a projectile.',
  category: 'Engineering',
  icon: 'Wind',
  inputs: [
    { id: 'velocity', label: 'Initial Velocity', type: 'number', defaultValue: 20, unit: 'm/s' },
    { id: 'angle', label: 'Launch Angle', type: 'slider', defaultValue: 45, min: 0, max: 90, unit: '°' },
    { id: 'gravity', label: 'Gravity', type: 'number', defaultValue: 9.81, unit: 'm/s²' },
  ],
  calculate: (inputs) => {
    const v = Number(inputs.velocity);
    const theta = Number(inputs.angle) * (Math.PI / 180);
    const g = Number(inputs.gravity);

    const time = (2 * v * Math.sin(theta)) / g;
    const range = (Math.pow(v, 2) * Math.sin(2 * theta)) / g;
    const maxHeight = (Math.pow(v, 2) * Math.pow(Math.sin(theta), 2)) / (2 * g);

    return { time, range, maxHeight };
  },
  formatResults: (raw) => [
    { id: 'range', label: 'Horizontal Range', value: (raw.range as number).toFixed(2), type: 'number', unit: 'm', highlight: true },
    { id: 'height', label: 'Max Height', value: (raw.maxHeight as number).toFixed(2), type: 'number', unit: 'm' },
    { id: 'time', label: 'Total Time', value: (raw.time as number).toFixed(2), type: 'duration', unit: 's' }
  ],
  getChartData: (raw) => {
    const data = [];
    const r = raw.range as number;
    const h = raw.maxHeight as number;
    // Parabolic approximation for visualization
    for (let i = 0; i <= 10; i++) {
      const x = (r / 10) * i;
      // y = x*tan(theta) - (g*x^2)/(2*v^2*cos^2(theta))
      // Simplified arc for UI
      const y = 4 * h * (x / r) * (1 - x / r);
      data.push({ name: x.toFixed(1), value: Math.max(0, y) });
    }
    return {
      type: 'area',
      data,
      title: 'Trajectory Path (Y vs X)'
    };
  }
};
