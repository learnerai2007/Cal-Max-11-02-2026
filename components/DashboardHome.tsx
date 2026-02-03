
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, Calendar, Cloud, Timer, FileText, Bell, CheckSquare, 
  Zap, Battery, MapPin, Plus, Trash2, ChevronRight, Play, Pause, RotateCcw, Star, ArrowUpRight, Calculator, Atom
} from 'lucide-react';
import { CalculatorLogo } from './CalculatorLogo';
import { CalculatorDef, HistoryItem } from '../types';
import { CALCULATORS } from '../services/calculatorEngine';

interface DashboardHomeProps {
  onSelectCalculator: (calc: CalculatorDef) => void;
  favorites?: string[];
  history?: HistoryItem[];
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ 
  onSelectCalculator,
  favorites = [],
  history = []
}) => {
  const [time, setTime] = useState(new Date());
  const [notepad, setNotepad] = useState(localStorage.getItem('omni-note') || '');
  const [todos, setTodos] = useState<{id: number, text: string, done: boolean}[]>(
    JSON.parse(localStorage.getItem('omni-todos') || '[]')
  );
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => { localStorage.setItem('omni-note', notepad); }, [notepad]);
  useEffect(() => { localStorage.setItem('omni-todos', JSON.stringify(todos)); }, [todos]);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const favoriteTools = useMemo(() => CALCULATORS.filter(c => favorites.includes(c.id)), [favorites]);
  const recentCalculators = useMemo(() => {
    return history
      .map(h => CALCULATORS.find(c => c.id === h.calculatorId))
      .filter((c, i, self) => c && self.findIndex(t => t?.id === c.id) === i)
      .slice(0, 4);
  }, [history]);

  const essentialTools = [
    CALCULATORS.find(c => c.id === 'math-basic'),
    CALCULATORS.find(c => c.id === 'math-scientific')
  ].filter(Boolean) as CalculatorDef[];

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16 animate-fade-in pb-40">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <CalculatorLogo className="w-64 h-80" />
        </div>
        <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
            THE <span className="text-indigo-500">COMPUTE</span><br />
            ORCHESTRA.
          </h1>
          <p className="text-slate-400 text-xl font-bold max-w-xl">
            Modular toolkits for high-stakes decisions and daily puzzles.
          </p>
          
          {/* Quick Launch Section */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
             {essentialTools.map(tool => (
               <button 
                key={tool.id}
                onClick={() => onSelectCalculator(tool)}
                className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white px-8 py-4 rounded-3xl flex items-center gap-4 hover:-translate-y-1 active:translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group"
               >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-slate-900 dark:border-white group-hover:bg-indigo-500 group-hover:text-white transition-colors`}>
                    {tool.id === 'math-basic' ? <Calculator size={24} /> : <Atom size={24} />}
                  </div>
                  <div className="text-left">
                     <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Launch Essential</span>
                     <span className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{tool.name}</span>
                  </div>
               </button>
             ))}
             <button 
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className="bg-indigo-600 hover:bg-indigo-500 text-white border-4 border-slate-900 px-8 py-4 rounded-3xl flex items-center gap-4 hover:-translate-y-1 active:translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
             >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white">
                   <Zap size={24} fill="white" />
                </div>
                <div className="text-left">
                   <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Neural Connect</span>
                   <span className="block text-sm font-black uppercase tracking-wider">OmniSearch</span>
                </div>
             </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Status Widgets */}
        <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center space-y-3 shadow-[6px_6px_0px_0px_rgba(99,102,241,1)] group hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors border-2 border-slate-900/10 dark:border-white/10">
            <Clock size={24} />
          </div>
          <div className="text-5xl font-black text-slate-900 dark:text-white mono leading-none">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Station Time</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center space-y-3 shadow-[6px_6px_0px_0px_rgba(244,63,94,1)] group hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors border-2 border-slate-900/10 dark:border-white/10">
            <Calendar size={24} />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
            {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Log Date</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center space-y-3 shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] group hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors border-2 border-slate-900/10 dark:border-white/10">
            <Cloud size={24} />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mono leading-none">24°C</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Atmosphere</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center space-y-3 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)] group hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors border-2 border-slate-900/10 dark:border-white/10">
            <Battery size={24} />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mono leading-none">READY</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Power Cells</span>
        </div>

        {/* Favorites Section */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[3rem] p-10 space-y-8 shadow-[8px_8px_0px_0px_rgba(99,102,241,1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-amber-500">
              <div className="p-2 bg-amber-500/10 rounded-xl border-2 border-amber-500/20">
                <Star size={24} fill="currentColor" />
              </div>
              <span className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Bookmarks</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {favoriteTools.length > 0 ? favoriteTools.slice(0, 4).map(c => (
              <button 
                key={c.id}
                onClick={() => onSelectCalculator(c)}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-900 dark:border-white/10 rounded-2xl hover:bg-indigo-500 hover:text-white hover:translate-x-1 transition-all group active:translate-y-1"
              >
                <span className="text-xs font-black truncate pr-2 tracking-tight">{c.name}</span>
                <ArrowUpRight size={16} className="text-indigo-500 group-hover:text-white" />
              </button>
            )) : (
              <p className="col-span-2 text-[10px] text-slate-500 font-bold uppercase py-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-center">Star tools to see them here.</p>
            )}
          </div>
        </div>

        {/* Recents Section */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[3rem] p-10 space-y-8 shadow-[8px_8px_0px_0px_rgba(244,63,94,1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-rose-500">
              <div className="p-2 bg-rose-500/10 rounded-xl border-2 border-rose-500/20">
                <Clock size={24} />
              </div>
              <span className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Recent Work</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recentCalculators.length > 0 ? recentCalculators.map(c => c && (
              <button 
                key={c.id}
                onClick={() => onSelectCalculator(c)}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-900 dark:border-white/10 rounded-2xl hover:bg-rose-500 hover:text-white hover:translate-x-1 transition-all group active:translate-y-1"
              >
                <span className="text-xs font-black truncate pr-2 tracking-tight">{c.name}</span>
                <ArrowUpRight size={16} className="text-rose-500 group-hover:text-white" />
              </button>
            )) : (
              <p className="col-span-2 text-[10px] text-slate-500 font-bold uppercase py-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-center">No recent history.</p>
            )}
          </div>
        </div>

        <div className="lg:row-span-2 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[3rem] p-10 space-y-6 flex flex-col shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]">
          <div className="flex items-center gap-4 text-amber-500">
            <div className="p-2 bg-amber-500/10 rounded-xl border-2 border-amber-500/20">
              <FileText size={24} />
            </div>
            <span className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Drafts</span>
          </div>
          <textarea 
            className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-900 dark:border-white/10 resize-none text-sm font-black text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 no-scrollbar leading-relaxed"
            placeholder="Quick notes..."
            value={notepad}
            onChange={(e) => setNotepad(e.target.value)}
          ></textarea>
        </div>

        <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[3rem] p-10 space-y-8 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-emerald-500">
              <div className="p-2 bg-emerald-500/10 rounded-xl border-2 border-emerald-500/20">
                <CheckSquare size={24} />
              </div>
              <span className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">Task Queue</span>
            </div>
            <button 
              onClick={() => {
                const text = prompt('New task:');
                if (text) setTodos([{ id: Date.now(), text, done: false }, ...todos]);
              }}
              className="p-2 bg-emerald-500 border-2 border-slate-900 rounded-xl text-white hover:scale-110 active:scale-90 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>
          <div className="space-y-4 max-h-[160px] overflow-y-auto no-scrollbar pr-4">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between group bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-slate-900 dark:border-white/10">
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => toggleTodo(todo.id)}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 border-slate-900 flex items-center justify-center transition-colors ${todo.done ? 'bg-emerald-500' : 'bg-white'}`}>
                    {todo.done && <RotateCcw size={14} className="text-white" />}
                  </div>
                  <span className={`text-sm font-black tracking-tight ${todo.done ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                  className="p-2 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all border-2 border-transparent hover:border-slate-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-[2.5rem] p-8 flex flex-col justify-between space-y-4 shadow-[6px_6px_0px_0px_rgba(244,63,94,1)]">
          <div className="flex items-center gap-3 text-rose-500">
            <Bell size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Pings</span>
          </div>
          <div className="p-4 bg-rose-500 border-2 border-slate-900 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
             <p className="text-xs text-white font-black truncate uppercase tracking-widest">Get Max Pro</p>
          </div>
        </div>

        <button 
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="bg-indigo-600 rounded-[2.5rem] p-8 border-4 border-slate-900 dark:border-white flex flex-col items-center justify-center space-y-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
        >
          <div className="w-14 h-14 bg-white border-4 border-slate-900 rounded-full flex items-center justify-center text-slate-900 mb-2 group-hover:rotate-12 transition-transform">
            <Plus size={32} strokeWidth={4} />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Find Engine</span>
        </button>
      </section>
    </div>
  );
};
