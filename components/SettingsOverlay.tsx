
import React from 'react';
import { X, Palette, Sun, Moon, Zap, Layers, Circle, Check, Volume2, VolumeX, Type, Shield, Sparkles } from 'lucide-react';
import { ThemeSettings } from '../types';

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ThemeSettings;
  onUpdate: (settings: Partial<ThemeSettings>) => void;
}

const ACCENT_COLORS = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Cyan', value: '#06b6d4' },
];

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({ isOpen, onClose, settings, onUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end p-0 md:p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full h-full md:w-[540px] md:h-auto md:max-h-[95vh] bg-slate-900 md:rounded-[4rem] border-l md:border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="px-10 py-12 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-accent rounded-[2rem] flex items-center justify-center text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/20">
              <Palette size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase">Identity</h3>
              <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em]">Customize your engine</p>
            </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Context */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-14">
          {/* Base DNA */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <Shield size={18} className="text-slate-600" />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Structural DNA</span>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <ThemeButton 
                active={settings.mode === 'light'} 
                onClick={() => onUpdate({ mode: 'light' })}
                icon={<Sun size={24} />}
                label="Solar"
                desc="High clarity"
              />
              <ThemeButton 
                active={settings.mode === 'dark'} 
                onClick={() => onUpdate({ mode: 'dark' })}
                icon={<Moon size={24} />}
                label="Void"
                desc="Zero fatigue"
              />
              <ThemeButton 
                active={settings.mode === 'glass'} 
                onClick={() => onUpdate({ mode: 'glass' })}
                icon={<Layers size={24} />}
                label="Frosted"
                desc="Deep depth"
              />
              <ThemeButton 
                active={settings.mode === 'neon'} 
                onClick={() => onUpdate({ mode: 'neon' })}
                icon={<Zap size={24} />}
                label="Cyber"
                desc="Reactive glow"
              />
            </div>
          </section>

          {/* Core Accent */}
          <section className="space-y-8">
             <div className="flex items-center gap-4">
              <Sparkles size={18} className="text-slate-600" />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Neural Signature</span>
            </div>
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-[2.5rem] border border-white/10">
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color.name}
                    onClick={() => onUpdate({ accent: color.value })}
                    className={`w-12 h-12 rounded-full transition-all flex items-center justify-center relative ${settings.accent === color.value ? 'scale-125 z-10 shadow-2xl' : 'hover:scale-110 opacity-50'}`}
                    style={{ backgroundColor: color.value, boxShadow: settings.accent === color.value ? `0 0 30px ${color.value}66` : 'none' }}
                  >
                    {settings.accent === color.value && <Check size={20} className="text-white drop-shadow-md" />}
                  </button>
                ))}
             </div>
          </section>

          {/* Interface Modifiers */}
          <section className="grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Typeface Scale</span>
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                {(['sm', 'base', 'lg'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => onUpdate({ fontSize: f })}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${settings.fontSize === f ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Audio Feedback</span>
              <button 
                onClick={() => onUpdate({ sounds: !settings.sounds })}
                className={`w-full py-3 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${settings.sounds ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400' : 'bg-white/5 border-white/5 text-slate-600'}`}
              >
                {settings.sounds ? <Volume2 size={16} /> : <VolumeX size={16} />}
                {settings.sounds ? 'Haptics Active' : 'Silent Mode'}
              </button>
            </div>
          </section>
        </div>

        {/* Global Action */}
        <div className="p-10 bg-slate-950/60 border-t border-white/10 shrink-0">
          <button 
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-7 rounded-[3rem] text-sm uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(79,70,229,0.4)] transition-all active:scale-95"
          >
            Apply Config
          </button>
        </div>
      </div>
    </div>
  );
};

const ThemeButton = ({ active, onClick, icon, label, desc }: any) => (
  <button
    onClick={onClick}
    className={`p-7 rounded-[2.5rem] border transition-all flex flex-col items-start gap-2 text-left group ${active ? 'bg-white border-white text-black shadow-[0_20px_50px_rgba(255,255,255,0.1)]' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-200'}`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 ${active ? 'bg-black text-white' : 'bg-white/5'}`}>
      {icon}
    </div>
    <span className="text-[14px] font-black uppercase tracking-widest leading-none">{label}</span>
    <span className={`text-[10px] font-bold uppercase tracking-tighter opacity-50`}>{desc}</span>
  </button>
);
