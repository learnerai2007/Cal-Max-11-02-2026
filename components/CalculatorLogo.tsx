
import React, { useState } from 'react';
import { Delete, Divide, Minus, Plus, X, Equal, Hash, Percent } from 'lucide-react';

export const CalculatorLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);

  const performCalculation = (nextValue: number) => {
    if (firstOperand === null || operator === null) return nextValue;
    
    switch (operator) {
      case '+': return firstOperand + nextValue;
      case '-': return firstOperand - nextValue;
      case '×': return firstOperand * nextValue;
      case '÷': return nextValue !== 0 ? firstOperand / nextValue : NaN;
      default: return nextValue;
    }
  };

  const handleAction = (btn: string | number) => {
    const btnStr = btn.toString();

    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(5);
    }

    if (!isNaN(Number(btnStr))) {
      if (waitingForNextValue) {
        setDisplay(btnStr);
        setWaitingForNextValue(false);
      } else {
        setDisplay(display === '0' ? btnStr : display + btnStr);
      }
      return;
    }

    if (btn === 'AC') {
      setDisplay('0');
      setEquation('');
      setFirstOperand(null);
      setOperator(null);
      setWaitingForNextValue(false);
      return;
    }

    if (btn === 'DEL') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
      return;
    }

    if (btn === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
      return;
    }

    if (btn === '=') {
      if (operator && firstOperand !== null) {
        const current = parseFloat(display);
        const result = performCalculation(current);
        const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(4);
        setEquation(`${firstOperand} ${operator} ${current} =`);
        setDisplay(resultStr.slice(0, 10));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForNextValue(false);
      }
      return;
    }

    const currentVal = parseFloat(display);
    if (firstOperand === null) {
      setFirstOperand(currentVal);
    } else if (operator && !waitingForNextValue) {
      const result = performCalculation(currentVal);
      setDisplay(result.toString().slice(0, 10));
      setFirstOperand(result);
    }
    
    setOperator(btnStr);
    setEquation(`${currentVal} ${btnStr}`);
    setWaitingForNextValue(true);
  };

  const buttons = [
    { val: 'AC', type: 'func', span: 2 }, { val: 'DEL', type: 'func' }, { val: '÷', type: 'op' },
    { val: 7, type: 'num' }, { val: 8, type: 'num' }, { val: 9, type: 'num' }, { val: '×', type: 'op' },
    { val: 4, type: 'num' }, { val: 5, type: 'num' }, { val: 6, type: 'num' }, { val: '-', type: 'op' },
    { val: 1, type: 'num' }, { val: 2, type: 'num' }, { val: 3, type: 'num' }, { val: '+', type: 'op' },
    { val: 0, type: 'num', span: 2 }, { val: '.', type: 'num' }, { val: '=', type: 'eq' }
  ];

  return (
    <div className={`relative ${className} select-none group`}>
      <div className="absolute inset-0 bg-indigo-800 rounded-[2.5rem] translate-y-4 group-hover:translate-y-2 transition-transform duration-300 shadow-2xl"></div>
      
      <div className="relative bg-indigo-500 rounded-[2.5rem] p-5 border-4 border-indigo-900 shadow-2xl transform group-hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
        
        <div className="bg-emerald-400 border-4 border-indigo-950 h-24 rounded-2xl mb-4 flex flex-col items-end justify-center px-4 shadow-inner relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          <div className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest leading-none mb-1 text-right w-full">
            {equation || 'CAL MAX OS'}
          </div>
          <span className="mono text-3xl font-black text-indigo-950 tracking-tighter truncate w-full text-right leading-none">
            {display}
          </span>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 flex-1 items-stretch">
          {buttons.map((btn, i) => (
            <button 
              key={i} 
              onClick={() => handleAction(btn.val)}
              className={`
                relative rounded-xl border-2 border-indigo-950 flex items-center justify-center font-black text-xs shadow-[0px_3px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none transition-all
                ${btn.span === 2 ? 'col-span-2' : 'col-span-1'}
                ${btn.type === 'num' ? 'bg-indigo-300 hover:bg-indigo-200 text-indigo-950' : 
                  btn.type === 'eq' ? 'bg-rose-400 hover:bg-rose-300 text-indigo-950' : 
                  btn.type === 'op' ? 'bg-indigo-400 hover:bg-indigo-300 text-indigo-950' : 
                  'bg-amber-400 hover:bg-amber-300 text-indigo-950'}
              `}
            >
              {btn.val === '÷' ? <Divide size={16} /> : 
               btn.val === '×' ? <X size={16} /> : 
               btn.val === '-' ? <Minus size={16} /> : 
               btn.val === '+' ? <Plus size={16} /> : 
               btn.val === '=' ? <Equal size={18} /> : 
               btn.val === 'DEL' ? <Delete size={16} /> : 
               btn.val}
            </button>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 -skew-y-12 pointer-events-none"></div>
      </div>

      <div className="absolute -top-4 -right-4 w-12 h-12 bg-rose-500 rounded-full border-4 border-indigo-950 flex items-center justify-center text-white font-black animate-float pointer-events-none shadow-lg z-10">
        %
      </div>
      <div className="absolute -bottom-2 -left-4 w-10 h-10 bg-amber-400 rounded-lg border-4 border-indigo-950 flex items-center justify-center text-indigo-950 font-black animate-float [animation-delay:1s] pointer-events-none shadow-lg z-10">
        <Hash size={20} />
      </div>
    </div>
  );
};
