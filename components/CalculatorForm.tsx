
import React, { useState } from 'react';
import { CalculatorDef, CalculatorInput } from '../types';
import { TextField, SliderField } from './ui/Input';
import { Delete, Divide, Minus, Plus, X, Equal, Hash, RotateCcw } from 'lucide-react';

interface CalculatorFormProps {
  calculator: CalculatorDef;
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ calculator, values, onChange }) => {
  // SPECIAL CASE: Standard and Scientific Physical Layouts
  if (calculator.id === 'math-basic' || calculator.id === 'math-scientific') {
    return <PhysicalInterface calculator={calculator} values={values} onChange={onChange} />;
  }

  const renderInput = (input: CalculatorInput, index: number) => {
    const commonProps = {
      key: input.id,
      label: input.label,
      className: "animate-fade-up",
      style: { animationDelay: `${index * 0.05}s` }
    };

    switch (input.type) {
      case 'slider':
        return (
          <SliderField
            {...commonProps}
            min={input.min || 0}
            max={input.max || 100}
            step={input.step || 1}
            unit={input.unit}
            value={values[input.id] ?? input.defaultValue}
            onChange={(e) => onChange(input.id, Number(e.target.value))}
          />
        );
      case 'select':
        return (
          <div key={input.id} className={`flex flex-col space-y-2 ${commonProps.className}`} style={commonProps.style}>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              {input.label}
            </label>
            <select
              value={values[input.id] ?? input.defaultValue}
              onChange={(e) => onChange(input.id, e.target.value)}
              className="block w-full rounded-2xl border-4 border-slate-900 bg-white px-4 py-3.5 text-sm font-black text-slate-900 focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {input.options?.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-white">{opt.label}</option>
              ))}
            </select>
          </div>
        );
      case 'date':
        return (
          <TextField
            {...commonProps}
            type="date"
            value={values[input.id] ?? input.defaultValue}
            onChange={(e) => onChange(input.id, e.target.value)}
          />
        );
      default:
        const isNumeric = input.type === 'number' || input.type === 'currency';
        return (
          <TextField
            {...commonProps}
            type={isNumeric ? 'number' : 'text'}
            unit={input.unit}
            value={values[input.id] ?? input.defaultValue}
            onChange={(e) => {
              const val = e.target.value;
              onChange(input.id, isNumeric ? (val === '' ? '' : Number(val)) : val);
            }}
            placeholder={input.description}
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        {calculator.inputs.map((input, idx) => renderInput(input, idx))}
      </div>
    </div>
  );
};

/**
 * A specialized skeuomorphic/cartoon interface for standard mathematical tools
 */
const PhysicalInterface: React.FC<CalculatorFormProps> = ({ calculator, values, onChange }) => {
  const [internalDisplay, setInternalDisplay] = useState('0');
  const [history, setHistory] = useState('');
  const [lastOp, setLastOp] = useState<string | null>(null);
  const [operand, setOperand] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(false);

  const handleKey = (key: string | number) => {
    // Haptic simulation
    if (window.navigator?.vibrate) window.navigator.vibrate(5);

    const k = key.toString();

    // Reset logic
    if (k === 'AC') {
      setInternalDisplay('0');
      setHistory('');
      setOperand(null);
      setLastOp(null);
      setWaiting(false);
      onChange('num1', 0);
      return;
    }

    // Number keys
    if (!isNaN(Number(k)) || k === '.') {
      if (waiting) {
        setInternalDisplay(k === '.' ? '0.' : k);
        setWaiting(false);
      } else {
        setInternalDisplay(internalDisplay === '0' && k !== '.' ? k : internalDisplay + k);
      }
      return;
    }

    // Operations
    const currentVal = parseFloat(internalDisplay);
    
    if (k === '=') {
      if (lastOp && operand !== null) {
        let res = 0;
        switch(lastOp) {
          case '+': res = operand + currentVal; break;
          case '-': res = operand - currentVal; break;
          case '×': res = operand * currentVal; break;
          case '÷': res = currentVal !== 0 ? operand / currentVal : 0; break;
        }
        const resStr = Number.isInteger(res) ? res.toString() : res.toFixed(4);
        setInternalDisplay(resStr.slice(0, 12));
        setHistory(`${operand} ${lastOp} ${currentVal} =`);
        setOperand(null);
        setLastOp(null);
        // Sync with engine
        onChange('num1', res);
      }
      return;
    }

    // Scientific / Special
    if (k === '√') {
      const res = Math.sqrt(currentVal);
      setInternalDisplay(res.toFixed(4).slice(0, 12));
      onChange('num1', res);
      return;
    }

    // Chain operations
    setOperand(currentVal);
    setLastOp(k);
    setWaiting(true);
    setHistory(`${currentVal} ${k}`);
  };

  const isSci = calculator.id === 'math-scientific';

  const basicButtons = [
    { label: 'AC', type: 'func' }, { label: 'DEL', type: 'func' }, { label: '%', type: 'func' }, { label: '÷', type: 'op' },
    { label: '7', type: 'num' }, { label: '8', type: 'num' }, { label: '9', type: 'num' }, { label: '×', type: 'op' },
    { label: '4', type: 'num' }, { label: '5', type: 'num' }, { label: '6', type: 'num' }, { label: '-', type: 'op' },
    { label: '1', type: 'num' }, { label: '2', type: 'num' }, { label: '3', type: 'num' }, { label: '+', type: 'op' },
    { label: '0', type: 'num', span: 2 }, { label: '.', type: 'num' }, { label: '=', type: 'eq' }
  ];

  const sciButtons = [
    { label: 'sin', type: 'sci' }, { label: 'cos', type: 'sci' }, { label: 'tan', type: 'sci' }, { label: '√', type: 'sci' },
    { label: 'log', type: 'sci' }, { label: 'ln', type: 'sci' }, { label: 'x²', type: 'sci' }, { label: 'π', type: 'sci' },
    ...basicButtons
  ];

  const buttons = isSci ? sciButtons : basicButtons;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-up">
      {/* Physical Calculator Shell */}
      <div className="relative bg-indigo-500 border-4 border-slate-900 rounded-[3rem] p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden group">
        
        {/* Screen */}
        <div className="bg-emerald-400 border-4 border-slate-900 rounded-2xl h-32 mb-6 flex flex-col items-end justify-center px-6 shadow-inner relative overflow-hidden">
          <div className="text-[11px] font-black text-slate-900/40 uppercase tracking-widest mb-1">{history || 'READY'}</div>
          <div className="text-4xl font-black text-slate-900 tracking-tighter mono truncate w-full text-right">{internalDisplay}</div>
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
        </div>

        {/* Grid */}
        <div className={`grid ${isSci ? 'grid-cols-4' : 'grid-cols-4'} gap-3`}>
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleKey(btn.label)}
              className={`
                ${btn.span === 2 ? 'col-span-2' : 'col-span-1'}
                h-14 rounded-2xl border-4 border-slate-900 flex items-center justify-center font-black transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                ${btn.type === 'num' ? 'bg-white text-slate-900 hover:bg-slate-50' : 
                  btn.type === 'op' ? 'bg-amber-400 text-slate-900 hover:bg-amber-300' :
                  btn.type === 'eq' ? 'bg-rose-500 text-white hover:bg-rose-400' :
                  btn.type === 'sci' ? 'bg-indigo-600 text-white text-[10px] uppercase tracking-widest' :
                  'bg-slate-200 text-slate-900 hover:bg-slate-100'}
              `}
            >
              {btn.label === '÷' ? <Divide size={20} /> :
               btn.label === '×' ? <X size={20} /> :
               btn.label === '-' ? <Minus size={20} /> :
               btn.label === '+' ? <Plus size={20} /> :
               btn.label === '=' ? <Equal size={20} /> :
               btn.label === 'DEL' ? <RotateCcw size={18} /> :
               btn.label}
            </button>
          ))}
        </div>

        {/* Gloss Overlay */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 -skew-y-6 pointer-events-none"></div>
      </div>

      <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-white/5 px-6 py-2 rounded-full border border-white/5">
        <Hash size={14} className="text-indigo-500" />
        <span>Physical Feedback Active</span>
      </div>
    </div>
  );
};
