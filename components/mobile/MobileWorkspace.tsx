
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, Share2, Sparkles, LayoutGrid, Info, X, Star } from 'lucide-react';
import { CalculatorDef, HistoryItem } from '../../types';
import { CalculatorForm } from '../CalculatorForm';
import { ResultsView } from '../ResultsView';
import * as LucideIcons from 'lucide-react';

interface MobileWorkspaceProps {
  calculator: CalculatorDef;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
}

const DynamicIcon = ({ name, size = 20 }: { name: string, size?: number }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.Calculator;
  return <Icon size={size} />;
};

export const MobileWorkspace: React.FC<MobileWorkspaceProps> = ({ 
  calculator, 
  onBack,
  isFavorite,
  onToggleFavorite,
  onAddToHistory
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    calculator.inputs.forEach(i => defaults[i.id] = i.defaultValue);
    return defaults;
  });

  const handleInputChange = (id: string, val: any) => {
    setInputs(prev => ({ ...prev, [id]: val }));
  };

  const results = useMemo(() => {
    try {
      const raw = calculator.calculate(inputs);
      const outputs = calculator.formatResults(raw);
      const chart = calculator.getChartData ? calculator.getChartData(raw) : null;
      return { outputs, raw, chart };
    } catch (e) {
      return { outputs: [], raw: {}, chart: null };
    }
  }, [calculator, inputs]);

  // Track history when calculation changes significantly
  useEffect(() => {
    const timer = setTimeout(() => {
      onAddToHistory({
        calculatorId: calculator.id,
        calculatorName: calculator.name,
        inputs,
        results: results.outputs
      });
    }, 2000); // 2s debounce for history tracking
    return () => clearTimeout(timer);
  }, [results.outputs, calculator.id]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-bg z-50 flex flex-col animate-slide-up no-scrollbar overflow-hidden">
      <header className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 active:scale-90 transition-all">
          <ChevronLeft size={20} />
        </button>
        <div className="ml-4 flex-1">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">{calculator.name}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{calculator.category}</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={onToggleFavorite} 
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isFavorite ? 'text-amber-500' : 'text-slate-400'}`}
          >
             <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400">
             <Share2 size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-10 pb-32">
        <section>
          <div className="flex items-center space-x-2 mb-6 opacity-60">
             <div className="w-1 h-1 bg-indigo-500 rounded-full" />
             <span className="text-[10px] font-black uppercase tracking-[0.15em]">Input Data</span>
          </div>
          <CalculatorForm calculator={calculator} values={inputs} onChange={handleInputChange} />
        </section>

        <section className="pt-6 border-t border-slate-100 dark:border-slate-900">
          <div className="flex items-center space-x-2 mb-6 opacity-60">
             <div className="w-1 h-1 bg-indigo-500 rounded-full" />
             <span className="text-[10px] font-black uppercase tracking-[0.15em]">Calculated Results</span>
          </div>
          <ResultsView 
            calculator={calculator} 
            inputs={inputs} 
            results={results.outputs} 
            chartConfig={results.chart} 
          />
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-dark-bg via-white/80 dark:via-dark-bg/80 to-transparent pointer-events-none" />
    </div>
  );
};
