import React from 'react';
import { Home, Search, LayoutGrid, Clock, Box } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabSelect: (tab: 'home' | 'tools' | 'search' | 'history') => void;
  isSidebarOpen: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabSelect, isSidebarOpen }) => {
  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-40">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 ring-1 ring-black/5">
        <div className="grid grid-cols-4 items-center">
          <button 
            onClick={() => onTabSelect('home')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${activeTab === 'home' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Home size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">Home</span>
          </button>

          <button 
            onClick={() => onTabSelect('tools')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${activeTab === 'tools' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Box size={20} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />
            <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">Tools</span>
          </button>
          
          <button 
            onClick={() => onTabSelect('search')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${activeTab === 'search' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Search size={20} strokeWidth={activeTab === 'search' ? 2.5 : 2} />
            <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">Search</span>
          </button>

          <button 
            onClick={() => onTabSelect('history')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${activeTab === 'history' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Clock size={20} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
            <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">History</span>
          </button>
        </div>
      </div>
    </nav>
  );
};