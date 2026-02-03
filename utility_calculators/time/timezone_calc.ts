import { CalculatorDef } from '../../types';

export const TIMEZONE_CALCULATOR: CalculatorDef = {
  id: 'utility-timezone',
  name: 'Time Zone Converter',
  description: 'Convert time between your local zone and major global financial hubs.',
  category: 'Utility',
  icon: 'Globe',
  inputs: [
    { id: 'time', label: 'Local Time', type: 'text', defaultValue: '12:00', description: 'HH:MM format' },
    { id: 'targetZone', label: 'Target City', type: 'select', defaultValue: 'America/New_York', options: [
      { label: 'New York (EST)', value: 'America/New_York' },
      { label: 'London (GMT)', value: 'Europe/London' },
      { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
      { label: 'Dubai (GST)', value: 'Asia/Dubai' },
      { label: 'Singapore (SGT)', value: 'Asia/Singapore' }
    ]},
  ],
  calculate: (inputs) => {
    const [h, m] = (inputs.time as string).split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0);

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: inputs.targetZone as string,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return { converted: formatter.format(date), zone: inputs.targetZone };
  },
  formatResults: (raw) => [
    { id: 'res', label: 'Converted Time', value: raw.converted as string, type: 'text', highlight: true },
    { id: 'zone', label: 'Target Region', value: raw.zone as string, type: 'text' }
  ]
};