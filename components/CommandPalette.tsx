
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calculator, ArrowRight, Zap, Star } from 'lucide-react';
import { CALCULATORS } from '../services/calculatorEngine';
import { CalculatorDef } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (calc: CalculatorDef) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return CALCULATORS.slice(0, 6);
    return CALCULATORS.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        if (results[selectedIndex]) onSelect(results[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-up">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3">
          <Search size={20} className="text-slate-400" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search for any calculator or command..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-lg font-medium placeholder:text-slate-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg text-[10px] font-bold border border-slate-200 dark:border-slate-700">ESC</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-2">
          {results.length > 0 ? (
            results.map((calc, idx) => (
              <button
                key={calc.id}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => onSelect(calc)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-2xl transition-all group
                  ${selectedIndex === idx ? 'bg-indigo-600 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${selectedIndex === idx ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}
                  `}>
                    <Calculator size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className={`text-sm font-bold ${selectedIndex === idx ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{calc.name}</h4>
                    <p className={`text-[10px] font-medium uppercase tracking-widest ${selectedIndex === idx ? 'text-indigo-100' : 'text-slate-400'}`}>{calc.category}</p>
                  </div>
                </div>
                <div className={`
                  flex items-center space-x-2 transition-transform duration-300
                  ${selectedIndex === idx ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                `}>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Launch</span>
                  <ArrowRight size={14} />
                </div>
              </button>
            ))
          ) : (
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Search size={32} />
              </div>
              <p className="text-slate-500 font-medium">No toolkits matching your query.</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm">ENTER</kbd>
                <span>Select</span>
              </div>
           </div>
           <div className="flex items-center space-x-1 text-[9px] font-bold text-indigo-500 uppercase tracking-widest">
              <Zap size={10} />
              <span>OmniSearch v2.0</span>
           </div>
        </div>
      </div>
    </div>
  );
};
