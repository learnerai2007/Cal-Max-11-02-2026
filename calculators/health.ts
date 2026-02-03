import { CalculatorDef } from '../types';

export const HEALTH_CALCULATORS: CalculatorDef[] = [
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate using the Mifflin-St Jeor Equation.',
    category: 'Health',
    icon: 'Zap',
    inputs: [
      { id: 'weight', label: 'Weight', type: 'number', defaultValue: 70, unit: 'kg' },
      { id: 'height', label: 'Height', type: 'number', defaultValue: 175, unit: 'cm' },
      { id: 'age', label: 'Age', type: 'number', defaultValue: 25, unit: 'Years' },
      { id: 'gender', label: 'Gender', type: 'select', defaultValue: 'male', options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}] },
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight);
      const h = Number(inputs.height);
      const a = Number(inputs.age);
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr = inputs.gender === 'male' ? bmr + 5 : bmr - 161;
      return { bmr };
    },
    formatResults: (raw) => [
      { id: 'bmr', label: 'Daily BMR', value: Math.round(raw.bmr as number), type: 'number', unit: 'kcal/day', highlight: true }
    ]
  },
  {
    id: 'macro-calculator',
    name: 'Macro Calculator',
    description: 'Determine your ideal daily intake of Protein, Carbs, and Fats.',
    category: 'Health',
    icon: 'Flame',
    inputs: [
      { id: 'calories', label: 'Target Daily Calories', type: 'number', defaultValue: 2000, unit: 'kcal' },
      { id: 'goal', label: 'Body Goal', type: 'select', defaultValue: 'maintenance', options: [
        {label: 'Lose Weight', value: 'lose'},
        {label: 'Maintenance', value: 'maintenance'},
        {label: 'Gain Muscle', value: 'gain'}
      ]},
    ],
    calculate: (inputs) => {
      const cal = Number(inputs.calories);
      let p, c, f;
      if (inputs.goal === 'lose') { p = 0.4; c = 0.3; f = 0.3; }
      else if (inputs.goal === 'gain') { p = 0.3; c = 0.5; f = 0.2; }
      else { p = 0.3; c = 0.4; f = 0.3; }
      
      return { 
        protein: (cal * p) / 4, 
        carbs: (cal * c) / 4, 
        fat: (cal * f) / 9 
      };
    },
    formatResults: (raw) => [
      { id: 'p', label: 'Protein', value: Math.round(raw.protein as number), type: 'number', unit: 'g' },
      { id: 'c', label: 'Carbs', value: Math.round(raw.carbs as number), type: 'number', unit: 'g' },
      { id: 'f', label: 'Fats', value: Math.round(raw.fat as number), type: 'number', unit: 'g' }
    ],
    getChartData: (raw) => ({
      type: 'pie',
      data: [
        { name: 'Protein', value: Math.round(raw.protein as number * 4), fill: '#f43f5e' },
        { name: 'Carbs', value: Math.round(raw.carbs as number * 4), fill: '#0ea5e9' },
        { name: 'Fats', value: Math.round(raw.fat as number * 9), fill: '#eab308' }
      ]
    })
  }
];