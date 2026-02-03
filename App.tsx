
import React, { useState, useEffect } from 'react';
import { MobileView } from './components/mobile/MobileView';
import { DesktopView } from './components/desktop/DesktopView';
import { CalculatorDef, CalculatorCategory, ThemeSettings, HistoryItem } from './types';
import { SettingsOverlay } from './components/SettingsOverlay';
import { CommandPalette } from './components/CommandPalette';
import { getCalculator } from './services/calculatorEngine';
import { Zap, Cpu } from 'lucide-react';

const DEFAULT_THEME: ThemeSettings = {
  mode: 'dark',
  accent: '#6366f1',
  radius: 'medium',
  glassIntensity: 'medium',
  fontSize: 'base',
  sounds: true,
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeCategory, setActiveCategory] = useState<CalculatorCategory | 'All'>('All');
  
  // FORCE NULL ON INIT to ensure Dashboard is shown first
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorDef | null>(null);
  const [mobileTab, setMobileTab] = useState<'home' | 'tools' | 'search' | 'history'>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('omni-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('omni-history');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('omni-theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initial Splash Sequence
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800);
    return () => clearTimeout(splashTimer);
  }, []);

  // Handle Hash Changes more strictly to avoid "loading into specific tool" if user just wants home
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').trim();
      // If hash is literally empty or just '#', we show the dashboard
      if (!hash || hash === '') {
        setSelectedCalculator(null);
        return;
      }
      const calc = getCalculator(hash);
      if (calc) {
        setSelectedCalculator(calc);
      } else {
        setSelectedCalculator(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // On mount, if there's no specific hash, we explicitly ensure null
    if (!window.location.hash || window.location.hash === '#/') {
      setSelectedCalculator(null);
    } else {
      handleHashChange();
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync Theme Vars
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('omni-theme', JSON.stringify(theme));
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--accent-color-dark', `${theme.accent}dd`);
    root.style.setProperty('--accent-glow', `${theme.accent}33`);
    
    if (theme.fontSize === 'sm') root.style.fontSize = '14px';
    else if (theme.fontSize === 'lg') root.style.fontSize = '18px';
    else root.style.fontSize = '16px';

    root.classList.remove('dark', 'light');
    if (theme.mode === 'light') root.classList.add('light');
    else root.classList.add('dark');
    
    if (theme.mode === 'midnight') {
      root.style.setProperty('--bg-primary', '#000000');
      root.style.setProperty('--bg-secondary', '#050505');
    } else if (theme.mode === 'glass') {
      root.style.setProperty('--bg-primary', '#020617');
      root.style.setProperty('--bg-secondary', 'rgba(15, 23, 42, 0.6)');
      root.style.setProperty('--glass-blur', '48px');
    } else if (theme.mode === 'neon') {
      root.style.setProperty('--bg-primary', '#020208');
      root.style.setProperty('--bg-secondary', '#050510');
      root.style.setProperty('--accent-glow', `${theme.accent}88`);
    }
  }, [theme]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  const handleCalculatorSelect = (calc: CalculatorDef | null) => {
    if (calc) {
      window.location.hash = `#/${calc.id}`;
    } else {
      window.location.hash = '';
    }
    setSelectedCalculator(calc);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100">
      {isInitialLoading && (
        <div className="fixed inset-0 z-[999] bg-[#020617] flex flex-col items-center justify-center animate-splash-fade">
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_80px_rgba(99,102,241,0.4)] animate-bounce">
              <Zap size={64} fill="white" />
            </div>
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2 glow-text">Cal Max</h1>
          <p className="text-indigo-400 font-bold text-sm uppercase tracking-[0.4em] opacity-80">Universal Computation Engine</p>
        </div>
      )}

      {isMobile ? (
        <MobileView 
          activeTab={mobileTab} 
          onTabSelect={setMobileTab}
          selectedCalculator={selectedCalculator}
          onSelectCalculator={handleCalculatorSelect}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenSettings={() => setIsSettingsOpen(true)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          history={history}
          onAddToHistory={addToHistory}
          onClearHistory={() => setHistory([])}
        />
      ) : (
        <DesktopView 
          selectedCalculator={selectedCalculator}
          onSelectCalculator={handleCalculatorSelect}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenSettings={() => setIsSettingsOpen(true)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          history={history}
          onAddToHistory={addToHistory}
        />
      )}

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelect={handleCalculatorSelect}
      />

      <SettingsOverlay 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={theme}
        onUpdate={(s) => setTheme(p => ({ ...p, ...s }))}
      />
    </div>
  );
}

export default App;
