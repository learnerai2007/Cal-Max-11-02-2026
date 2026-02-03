import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  unit?: string;
}

export const TextField: React.FC<InputProps> = ({ label, error, unit, className = '', ...props }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all hover:border-slate-700"
        {...props}
      />
      {unit && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          {unit}
        </div>
      )}
    </div>
    {error && <p className="text-[10px] font-bold text-rose-500 ml-1">{error}</p>}
  </div>
);

interface SliderProps extends InputProps {
  min: number;
  max: number;
  step?: number;
}

export const SliderField: React.FC<SliderProps> = ({ label, unit, min, max, value, onChange, ...props }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end px-1">
        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em]">
          {label}
        </label>
        <div className="flex items-baseline space-x-1">
          <span className="mono text-lg font-bold text-indigo-400">{value}</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{unit}</span>
        </div>
      </div>
      <div className="relative h-6 flex items-center group">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          {...props}
        />
      </div>
      <div className="flex justify-between px-1">
        <span className="text-[9px] font-bold text-slate-600 mono">{min}</span>
        <span className="text-[9px] font-bold text-slate-600 mono">{max}</span>
      </div>
    </div>
  );
};