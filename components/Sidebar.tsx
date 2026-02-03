
import React from 'react';
import { 
  TrendingUp, Activity, Settings, PieChart, Cpu, 
  Zap, Box, BrainCircuit, Star, Clock, Trash2, Calculator, Atom, Search
} from 'lucide-react';
import { CalculatorCategory, CalculatorDef } from '../types';
import { CALCULATORS } from '../services/calculatorEngine';

interface SidebarProps {
  activeCategory: string | 'All';
  onSelectCategory: (cat: string | 'All') => void;
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  history: any[];
  onSelectCalculator: (c: CalculatorDef) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  onSelectCategory, 
  isOpen, 
  onClose,
  favorites,
  history,
  onSelectCalculator
}) => {
  const categories: { id: CalculatorCategory | 'All', label: string, icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Tools', icon: <Box size={18} /> },
    { id: 'Finance', label: 'Finance', icon: <TrendingUp size={18} /> },
    { id: 'Health', label: 'Health', icon: <Activity size={18} /> },
    { id: 'Math', label: 'Math', icon: <Calculator size={18} /> },
    { id: 'Engineering', label: 'Engineering', icon: <Cpu size={18} /> },
    { id: 'Utility', label: 'Utility', icon: <Settings size={18} /> },
    { id: 'Advanced', label: 'Advanced', icon: <BrainCircuit size={18} /> },
  ];

  const essentialTools = [
    CALCULATORS.find(c => c.id === 'math-basic'),
    CALCULATORS.find(c => c.id === 'math-scientific')
  ].filter(Boolean) as CalculatorDef[];

  const favoriteTools = CALCULATORS.filter(c => favorites.includes(c.id));
  const recentTools = history
    .map(h => CALCULATORS.find(c => c.id === h.calculatorId))
    .filter((c, i, self) => c && self.findIndex(t => t?.id === c.id) === i)
    .slice(0, 3);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-950 border-r-4 border-slate-900 z-50
        transition-transform duration-300 ease-in-out flex flex-col overflow-hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-8 shrink-0">
          <div 
            className="flex items-center space-x-3 group cursor-pointer mb-10 active:scale-95 transition-transform" 
            onClick={() => { onSelectCategory('All'); onSelectCalculator(null as any); }}
          >
            <div className="w-10 h-10 bg-indigo-600 border-4 border-slate-900 rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
               <Zap size={22} fill="white" />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Cal Max</span>
          </div>

          {/* Quick Access Essentials */}
          <div className="mb-10 space-y-3">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Quick Access</div>
             <div className="grid grid-cols-1 gap-2">
                {essentialTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => onSelectCalculator(tool)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border-2 border-slate-900 text-slate-900 dark:text-white hover:bg-indigo-500 hover:text-white transition-all group active:translate-y-1 active:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border-2 border-current">
                       {tool.id === 'math-basic' ? <Calculator size={16} /> : <Atom size={16} />}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider truncate">{tool.name}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Library</div>
          <nav className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                  ${activeCategory === cat.id 
                    ? 'text-indigo-600 bg-indigo-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}
                `}
              >
                <span className="opacity-70">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-4 space-y-10">
          {favoriteTools.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 px-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <Star size={12} className="text-amber-500" fill="currentColor" />
                <span>Favorites</span>
              </div>
              <div className="space-y-2">
                {favoriteTools.map(tool => (
                  <button 
                    key={tool.id} 
                    onClick={() => onSelectCalculator(tool)}
                    className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white rounded-xl truncate transition-all border-2 border-transparent hover:border-slate-900"
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
            </section>
          )}

          {recentTools.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 px-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <Clock size={12} className="text-indigo-500" />
                <span>History</span>
              </div>
              <div className="space-y-2">
                {recentTools.map(tool => tool && (
                  <button 
                    key={tool.id} 
                    onClick={() => onSelectCalculator(tool)}
                    className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white rounded-xl truncate transition-all border-2 border-transparent hover:border-slate-900"
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="p-8 border-t-4 border-slate-900 shrink-0 bg-slate-50 dark:bg-slate-900/40">
          <button 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="w-full bg-white dark:bg-slate-800 border-4 border-slate-900 p-4 rounded-2xl flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
          >
             <div className="flex items-center gap-3">
                <Search size={18} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Command Pal</span>
             </div>
             <kbd className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black leading-none">⌘K</kbd>
          </button>
        </div>
      </aside>
    </>
  );
};
