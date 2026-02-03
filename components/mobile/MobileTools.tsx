
import React, { useState, useMemo } from 'react';
import { CalculatorDef, CalculatorCategory } from '../../types';
import { CALCULATORS } from '../../services/calculatorEngine';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  TrendingUp, 
  Activity, 
  Calculator as CalcIcon, 
  Cpu, 
  Settings, 
  X,
  Plus,
  Minus,
  ArrowUpRight,
  Atom,
  Zap
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const DynamicIcon = ({ name, size = 18 }: { name: string, size?: number }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.Calculator;
  return <Icon size={size} />;
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Finance': <TrendingUp size={18} className="text-emerald-400" />,
  'Health': <Activity size={18} className="text-rose-400" />,
  'Math': <CalcIcon size={18} className="text-indigo-400" />,
  'Engineering': <Cpu size={18} className="text-amber-400" />,
  'Utility': <Settings size={18} className="text-slate-400" />,
};

interface MobileToolsProps {
  onSelectCalculator: (calc: CalculatorDef) => void;
  favorites: string[];
}

export const MobileTools: React.FC<MobileToolsProps> = ({ onSelectCalculator, favorites }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(['Finance', 'Math']));

  const groupedCalculators = useMemo(() => {
    const groups: Record<string, CalculatorDef[]> = {};
    const query = searchQuery.toLowerCase();

    CALCULATORS.forEach(calc => {
      if (
        query && 
        !calc.name.toLowerCase().includes(query) && 
        !calc.description.toLowerCase().includes(query)
      ) return;

      if (!groups[calc.category]) groups[calc.category] = [];
      groups[calc.category].push(calc);
    });
    return groups;
  }, [searchQuery]);

  const essentialTools = [
    CALCULATORS.find(c => c.id === 'math-basic'),
    CALCULATORS.find(c => c.id === 'math-scientific')
  ].filter(Boolean) as CalculatorDef[];

  const toggleCategory = (cat: string) => {
    const next = new Set(expandedCats);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setExpandedCats(next);
  };

  const categories = Object.keys(groupedCalculators).sort();

  return (
    <div className="animate-fade-in flex flex-col h-full bg-slate-950">
      {/* Search Header */}
      <div className="sticky top-0 bg-slate-950/80 backdrop-blur-xl z-30 px-6 py-4 border-b border-white/5">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text"
            placeholder="Search toolkits..."
            className="w-full bg-slate-900 border-2 border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-8 space-y-10 pb-40">
        
        {/* Persistent Essentials Section for Mobile */}
        {!searchQuery && (
          <section className="space-y-4">
             <div className="flex items-center space-x-2 px-2">
                {/* Fixed: Added Zap to imports above */}
                <Zap size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quick Access</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {essentialTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => onSelectCalculator(tool)}
                    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-900 rounded-[2rem] active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] transition-all"
                  >
                     <div className="w-12 h-12 bg-indigo-500 border-2 border-slate-900 rounded-2xl flex items-center justify-center text-white mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {tool.id === 'math-basic' ? <CalcIcon size={24} /> : <Atom size={24} />}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{tool.name}</span>
                  </button>
                ))}
             </div>
          </section>
        )}

        {categories.length > 0 ? (
          categories.map(cat => {
            const isOpen = expandedCats.has(cat) || searchQuery !== '';
            const calcs = groupedCalculators[cat];

            return (
              <div key={cat} className="space-y-4">
                {/* Category Node */}
                <button
                  onClick={() => toggleCategory(cat)}
                  className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all border-2 ${isOpen ? 'bg-white/5 border-indigo-500/50' : 'bg-transparent border-white/5'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl bg-slate-900 border-2 border-white/10`}>
                      {CATEGORY_ICONS[cat] || <CalcIcon size={18} />}
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-black uppercase tracking-widest text-white">{cat}</span>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{calcs.length} Tools</p>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300`}>
                    {isOpen ? <Minus size={16} className="text-indigo-500" /> : <Plus size={16} className="text-slate-600" />}
                  </div>
                </button>

                {/* Leaves (Calculators) */}
                {isOpen && (
                  <div className="grid grid-cols-1 gap-4 py-2">
                    {calcs.map((calc, idx) => (
                      <button
                        key={calc.id}
                        onClick={() => onSelectCalculator(calc)}
                        className="group relative flex items-center space-x-4 p-5 bg-white border-2 border-slate-900 rounded-[2rem] active:translate-y-1 active:shadow-none transition-all text-left shadow-[4px_4px_0px_0px_rgba(99,102,241,1)]"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        <div className="w-12 h-12 bg-indigo-500 border-2 border-slate-900 rounded-2xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white">
                          <DynamicIcon name={calc.icon} size={20} />
                          {favorites.includes(calc.id) && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                              <div className="w-1 h-1 bg-slate-900 rounded-full" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-slate-900 truncate tracking-tight">{calc.name}</h4>
                          <p className="text-[10px] font-bold text-slate-500 truncate mt-0.5 leading-tight">{calc.description}</p>
                        </div>
                        <div className="text-slate-900">
                          <ArrowUpRight size={18} strokeWidth={3} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto text-slate-700">
               <Search size={32} />
            </div>
            <p className="text-sm font-bold text-slate-500">No matching toolkits found</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[10px] font-black uppercase tracking-widest text-indigo-500 px-4 py-2 bg-indigo-500/10 rounded-lg"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
