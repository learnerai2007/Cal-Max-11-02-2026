
import React from 'react';
import { Clock, Trash2, ArrowRight, Calculator } from 'lucide-react';
import { HistoryItem, CalculatorDef } from '../../types';
import { CALCULATORS } from '../../services/calculatorEngine';

interface MobileHistoryProps {
  history: HistoryItem[];
  onSelectCalculator: (c: CalculatorDef) => void;
  onClearHistory: () => void;
}

export const MobileHistory: React.FC<MobileHistoryProps> = ({ 
  history, 
  onSelectCalculator,
  onClearHistory 
}) => {
  if (history.length === 0) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center py-24 space-y-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300">
          <Clock size={32} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Calculations</h3>
          <p className="text-xs text-slate-400 max-w-[200px] mx-auto mt-2 leading-relaxed">Your calculation history is stored locally and will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-32 animate-fade-in">
      <div className="flex items-center justify-between px-2">
         <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Computation Log</h2>
         <button onClick={onClearHistory} className="text-slate-500 hover:text-rose-500 transition-colors">
            <Trash2 size={16} />
         </button>
      </div>

      <div className="space-y-4">
        {history.map(item => {
          const tool = CALCULATORS.find(c => c.id === item.calculatorId);
          if (!tool) return null;
          
          return (
            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center">
                        <Calculator size={16} />
                     </div>
                     <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.calculatorName}</h4>
                        <p className="text-[9px] text-slate-400">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => onSelectCalculator(tool)}
                    className="p-2 text-indigo-500 hover:bg-indigo-500/10 rounded-lg transition-all"
                  >
                    <ArrowRight size={18} />
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-50 dark:border-slate-800/50">
                  {item.results.slice(0, 2).map(res => (
                    <div key={res.id}>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{res.label}</p>
                       <p className="text-xs font-bold text-slate-900 dark:text-white">{res.value} {res.unit}</p>
                    </div>
                  ))}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
