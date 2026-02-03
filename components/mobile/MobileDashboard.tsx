
import React from 'react';
import { CalculatorDef, HistoryItem } from '../../types';
import { DashboardHome } from '../DashboardHome';

interface MobileDashboardProps {
  onSelect: (c: CalculatorDef) => void;
  favorites: string[];
  history: HistoryItem[];
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({ 
  onSelect,
  favorites,
  history
}) => {
  return (
    <div className="min-h-full">
      <DashboardHome 
        onSelectCalculator={onSelect} 
        favorites={favorites}
        history={history}
      />
    </div>
  );
};
