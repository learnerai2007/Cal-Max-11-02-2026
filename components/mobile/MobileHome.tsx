import React from 'react';
import { CalculatorDef } from '../../types';
import { CALCULATORS } from '../../services/calculatorEngine';
import { TrendingUp, Star, ArrowRight, Activity, Cpu, Settings, Smartphone } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const DynamicIcon = ({ name, size = 20 }: { name: string, size?: number }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.Calculator;
  return <Icon size={size} />;
};

export const MobileHome: React.FC<{ onSelectCalculator: (c: CalculatorDef) => void }> = ({ onSelectCalculator }) => {
  const trending = CALCULATORS.slice(0, 4);
  
  return (
    <div className="p-6 space-y-10 animate-fade-in">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Featured Toolkits</h2>
        </div>
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Smart Finance Pro</h3>
            <p className="text-indigo-100 text-xs leading-relaxed max-w-[200px] mb-6">Manage mortgages, SIPs, and taxes in one premium dashboard.</p>
            <button 
              onClick={() => onSelectCalculator(CALCULATORS.find(c => c.id === 'mortgage-calculator')!)}
              className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center group-hover:gap-2 transition-all"
            >
              Start Calculating <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-700">
             <TrendingUp size={140} />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Popular Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          {trending.map((calc, idx) => (
            <button 
              key={calc.id}
              onClick={() => onSelectCalculator(calc)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex flex-col items-start text-left shadow-sm active:scale-95 transition-all group"
            >
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-500 mb-4 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 transition-colors">
                <DynamicIcon name={calc.icon} />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{calc.name}</h4>
              <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">{calc.category}</span>
            </button>
          ))}
        </div>
      </section>
      
      <section className="pb-10">
        <div className="bg-slate-100 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Smartphone size={24} />
          </div>
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">More Tools Coming</h4>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">We are adding 10+ new calculators every week based on user requests.</p>
        </div>
      </section>
    </div>
  );
};
