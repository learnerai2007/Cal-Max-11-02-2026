import React, { useState, useMemo } from 'react';
import { Search, Calculator, Star, X } from 'lucide-react';
import { CALCULATORS } from '../../services/calculatorEngine';
import { CalculatorDef } from '../../types';

export const MobileSearch: React.FC<{ onSelectCalculator: (c: CalculatorDef) => void }> = ({ onSelectCalculator }) => {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return CALCULATORS.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const tags = ['Mortgage', 'BMI', 'Loan', 'Percentage', 'SIP', 'Tax'];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          autoFocus
          type="text"
          placeholder="What do you want to calculate?"
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
             <X size={16} />
          </button>
        )}
      </div>

      {!query ? (
        <div className="space-y-6">
          <div className="space-y-3">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Common Searches</h3>
             <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-xl hover:bg-indigo-50 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="p-8 text-center bg-indigo-50/50 dark:bg-indigo-950/20 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
             <Calculator size={32} className="mx-auto text-indigo-500 mb-4 opacity-40" />
             <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Search through our database of 200+ specialized computation engines.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">{results.length} Tools Found</p>
           <div className="space-y-3">
             {results.map(calc => (
               <button
                key={calc.id}
                onClick={() => onSelectCalculator(calc)}
                className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center space-x-4 text-left shadow-sm active:scale-[0.98] transition-all"
               >
                 <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500">
                    <Calculator size={18} />
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{calc.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{calc.category}</p>
                 </div>
               </button>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};
