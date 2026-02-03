
import React from 'react';
import { Home, Box, Search, Clock, Zap, Settings } from 'lucide-react';
import { MobileDashboard } from './MobileDashboard';
import { MobileTools } from './MobileTools';
import { MobileSearch } from './MobileSearch';
import { MobileHistory } from './MobileHistory';
import { MobileWorkspace } from './MobileWorkspace';
import { CalculatorDef, CalculatorCategory, HistoryItem } from '../../types';

interface MobileViewProps {
  activeTab: 'home' | 'tools' | 'search' | 'history';
  onTabSelect: (tab: any) => void;
  selectedCalculator: CalculatorDef | null;
  onSelectCalculator: (calc: CalculatorDef | null) => void;
  activeCategory: CalculatorCategory | 'All';
  onSelectCategory: (cat: any) => void;
  onOpenSettings: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  history: HistoryItem[];
  onAddToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  onClearHistory: () => void;
}

export const MobileView: React.FC<MobileViewProps> = ({
  activeTab,
  onTabSelect,
  selectedCalculator,
  onSelectCalculator,
  activeCategory,
  onSelectCategory,
  onOpenSettings,
  favorites,
  onToggleFavorite,
  history,
  onAddToHistory,
  onClearHistory
}) => {
  const resetToHome = () => {
    onSelectCalculator(null);
    onTabSelect('home');
    onSelectCategory('All');
  };

  if (selectedCalculator) {
    return (
      <MobileWorkspace 
        calculator={selectedCalculator} 
        onBack={() => onSelectCalculator(null)} 
        isFavorite={favorites.includes(selectedCalculator.id)}
        onToggleFavorite={() => onToggleFavorite(selectedCalculator.id)}
        onAddToHistory={onAddToHistory}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      <header className="h-16 flex items-center justify-between px-6 shrink-0 z-30 bg-slate-950 border-b border-white/5">
        <div 
          className="flex items-center space-x-2 cursor-pointer active:scale-95 transition-transform"
          onClick={resetToHome}
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
            <Zap size={18} />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-white">Cal Max</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenSettings}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 active:scale-90 transition-all"
          >
            <Settings size={18} />
          </button>
          <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'home' && (
          <MobileDashboard 
            onSelect={onSelectCalculator} 
            favorites={favorites}
            history={history}
          />
        )}
        {activeTab === 'tools' && (
          <MobileTools 
            onSelectCalculator={onSelectCalculator} 
            favorites={favorites}
          />
        )}
        {activeTab === 'search' && <MobileSearch onSelectCalculator={onSelectCalculator} />}
        {activeTab === 'history' && (
          <MobileHistory 
            history={history} 
            onSelectCalculator={onSelectCalculator} 
            onClearHistory={onClearHistory}
          />
        )}
      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] z-50">
        <div className="glass-heavy rounded-[2.5rem] p-2 ring-1 ring-white/10 flex justify-between shadow-2xl shadow-black/40">
          <TabButton icon={<Home size={22} />} label="Home" active={activeTab === 'home'} onClick={() => onTabSelect('home')} />
          <TabButton icon={<Box size={22} />} label="Tools" active={activeTab === 'tools'} onClick={() => onTabSelect('tools')} />
          <TabButton icon={<Search size={22} />} label="Search" active={activeTab === 'search'} onClick={() => onTabSelect('search')} />
          <TabButton icon={<Clock size={22} />} label="History" active={activeTab === 'history'} onClick={() => onTabSelect('history')} />
        </div>
      </nav>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center py-2.5 rounded-[2rem] transition-all relative ${active ? 'text-accent bg-white/5' : 'text-slate-500'}`}
  >
    {icon}
    <span className="text-[8px] font-black mt-1 uppercase tracking-tighter">{label}</span>
    {active && (
      <div className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full" />
    )}
  </button>
);
