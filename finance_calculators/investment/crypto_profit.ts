import { CalculatorDef } from '../../types';

export const CRYPTO_PROFIT_CALC: CalculatorDef = {
  id: 'finance-crypto-profit',
  name: 'Crypto Profit Tracker',
  description: 'Calculate ROI and net profit for your crypto trades including buy/sell fees.',
  category: 'Finance',
  icon: 'Bitcoin',
  inputs: [
    { id: 'investment', label: 'Investment Amount', type: 'currency', defaultValue: 1000, unit: '$' },
    { id: 'buyPrice', label: 'Buy Price', type: 'number', defaultValue: 50000, unit: '$' },
    { id: 'sellPrice', label: 'Current/Sell Price', type: 'number', defaultValue: 65000, unit: '$' },
    { id: 'fee', label: 'Exchange Fee (per trade)', type: 'slider', defaultValue: 0.1, min: 0, max: 2, step: 0.01, unit: '%' },
  ],
  calculate: (inputs) => {
    const buy = Number(inputs.buyPrice);
    const sell = Number(inputs.sellPrice);
    const capital = Number(inputs.investment);
    const feePct = Number(inputs.fee) / 100;

    const coins = capital / buy;
    const grossSellValue = coins * sell;
    
    const buyFee = capital * feePct;
    const sellFee = grossSellValue * feePct;
    
    const totalFees = buyFee + sellFee;
    const netProfit = grossSellValue - capital - totalFees;
    const roi = (netProfit / capital) * 100;

    return { netProfit, roi, totalFees, coins, finalValue: grossSellValue - sellFee };
  },
  formatResults: (raw) => [
    { id: 'profit', label: 'Net Profit/Loss', value: raw.netProfit as number, type: 'currency', highlight: true },
    { id: 'roi', label: 'Return on Investment', value: raw.roi as number, type: 'percent' },
    { id: 'final', label: 'Total Portfolio Value', value: raw.finalValue as number, type: 'currency' },
    { id: 'fees', label: 'Total Fees Paid', value: raw.totalFees as number, type: 'currency' }
  ]
};