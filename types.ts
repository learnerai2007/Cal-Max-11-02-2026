
export type CalculatorCategory = 'Finance' | 'Health' | 'Math' | 'Engineering' | 'Utility' | 'Advanced';

export type InputType = 'number' | 'slider' | 'currency' | 'select' | 'toggle' | 'date' | 'text';

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'midnight' | 'glass' | 'neon';
  accent: string;
  radius: 'none' | 'small' | 'medium' | 'large' | 'full';
  glassIntensity: 'none' | 'low' | 'medium' | 'high';
  fontSize: 'sm' | 'base' | 'lg';
  sounds: boolean;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  defaultValue: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: SelectOption[];
  description?: string;
  required?: boolean;
}

export interface CalculatorResult {
  id: string;
  label: string;
  value: number | string;
  type: 'currency' | 'percent' | 'number' | 'text' | 'duration';
  unit?: string;
  highlight?: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
  [key: string]: any;
}

export interface ChartConfig {
  type: 'pie' | 'bar' | 'area' | 'composed';
  data: ChartDataPoint[];
  dataKeys?: string[];
  colors?: string[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

export interface CalculatorDef {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  icon: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, any>) => Record<string, any>;
  formatResults: (raw: Record<string, any>) => CalculatorResult[];
  getChartData?: (raw: Record<string, any>) => ChartConfig | null;
}

export interface HistoryItem {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: number;
  inputs: Record<string, any>;
  results: CalculatorResult[];
}
