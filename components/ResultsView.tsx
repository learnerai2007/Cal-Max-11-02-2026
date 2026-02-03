
import React, { useState, useEffect } from 'react';
import { CalculatorDef, CalculatorResult, ChartConfig } from '../types';
import { Charts } from './Charts';
import { Sparkles, Share2, Download, X, Info, AlertCircle, RefreshCw } from 'lucide-react';
import { getAIExplanation } from '../services/geminiService';

interface ResultsViewProps {
  calculator: CalculatorDef;
  inputs: Record<string, any>;
  results: CalculatorResult[];
  chartConfig: ChartConfig | null;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ calculator, inputs, results, chartConfig }) => {
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Reset internal state when tool or inputs change
  useEffect(() => {
    setAiExplanation(null);
    // Basic validation check for obvious errors like Infinity or NaN
    const hasError = results.some(r => 
      String(r.value).toLowerCase() === 'nan' || 
      String(r.value).toLowerCase() === 'infinity' || 
      String(r.value).includes('Error')
    );
    
    if (hasError) {
      setCalculationError("Computation threshold exceeded or invalid mathematical input detected.");
    } else {
      setCalculationError(null);
    }
  }, [calculator.id, results]);

  const handleAIExplain = async () => {
    if (calculationError) return;
    setIsLoadingAI(true);
    try {
      const outputs = results.reduce((acc, r) => ({ ...acc, [r.label]: `${r.value} ${r.unit || ''}` }), {});
      const explanation = await getAIExplanation(calculator.name, inputs, outputs);
      setAiExplanation(explanation);
    } catch (err) {
      setAiExplanation("AI analysis temporarily unavailable. Please verify inputs.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const formatValue = (res: CalculatorResult) => {
    if (res.type === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(res.value));
    }
    if (res.type === 'percent') {
      return `${Number(res.value).toFixed(2)}%`;
    }
    return res.value;
  };

  if (calculationError) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8 text-center animate-fade-up">
        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-6 border border-rose-500/20">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Computation Aborted</h3>
        <p className="text-sm text-slate-400 mb-8 max-w-[280px] leading-relaxed">
          {calculationError}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <RefreshCw size={14} /> Reset Engine
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 h-full">
      <div className="grid grid-cols-1 gap-4">
        {results.map((res, idx) => (
          <div 
            key={res.id} 
            className={`
              p-6 rounded-2xl transition-all duration-500 animate-fade-up
              ${res.highlight 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' 
                : 'bg-white/5 border border-white/10'}
            `}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${res.highlight ? 'text-indigo-100' : 'text-slate-500'}`}>
              {res.label}
            </div>
            
            <div className={`text-3xl font-bold tracking-tight leading-none ${res.highlight ? 'text-white' : 'text-slate-100'}`}>
              {formatValue(res)}
              {res.unit && res.type !== 'currency' && res.type !== 'percent' && (
                <span className={`text-sm ml-2 font-medium ${res.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{res.unit}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {chartConfig && (
        <div className="bg-white/5 border border-white/5 p-6 rounded-2xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
           <Charts config={chartConfig} />
        </div>
      )}

      <div className="mt-auto space-y-4">
        {!aiExplanation ? (
           <button 
            className={`w-full group relative flex items-center justify-center space-x-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all overflow-hidden
              ${isLoadingAI ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95'}
            `} 
            onClick={handleAIExplain}
            disabled={isLoadingAI}
          >
            {isLoadingAI && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            )}
            <Sparkles size={16} className={isLoadingAI ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'} />
            <span className="relative z-10">{isLoadingAI ? 'Synthesizing...' : 'Generate AI Insights'}</span>
          </button>
        ) : (
          <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-6 relative animate-fade-up shadow-2xl shadow-black/20 overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -mr-10 -mt-10" />
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-2 text-indigo-400">
                 <Sparkles size={16} />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">OmniAI Summary</span>
               </div>
               <button onClick={() => setAiExplanation(null)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={16} />
               </button>
             </div>
             <div className="text-xs text-slate-300 leading-relaxed font-medium space-y-2">
                {aiExplanation.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
             </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 opacity-40">
           <button className="text-[9px] font-black text-white hover:text-accent uppercase tracking-[0.2em] flex items-center transition-colors">
             <Share2 size={12} className="mr-2" /> Share
           </button>
           <button className="text-[9px] font-black text-white hover:text-accent uppercase tracking-[0.2em] flex items-center transition-colors">
             <Download size={12} className="mr-2" /> Export
           </button>
        </div>
      </div>
    </div>
  );
};
