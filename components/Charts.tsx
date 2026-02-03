import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area, ComposedChart, Line
} from 'recharts';
import { ChartConfig } from '../types';

interface ChartsProps {
  config: ChartConfig | null;
}

const COLORS = ['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const Charts: React.FC<ChartsProps> = ({ config }) => {
  if (!config) return null;

  const renderChart = () => {
    switch (config.type) {
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={config.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {config.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || config.colors?.[index % (config.colors?.length || 0)] || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart data={config.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {config.data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={config.data}>
             <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        );
      case 'composed':
          return (
            <ComposedChart data={config.data}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
               <XAxis dataKey="name" tick={{fontSize: 10}} interval={Math.floor(config.data.length / 5)} />
               <YAxis tick={{fontSize: 12}} />
               <Tooltip contentStyle={{ borderRadius: '8px' }} />
               <Legend />
               {config.dataKeys?.map((key, index) => (
                   index === 0 ? 
                   <Area key={key} type="monotone" dataKey={key} fill="#e2e8f0" stroke="none" /> :
                   <Line key={key} type="monotone" dataKey={key} stroke={config.colors?.[1] || COLORS[1]} dot={false} strokeWidth={2} />
               ))}
            </ComposedChart>
          )
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
      {config.title && <p className="text-center text-xs font-medium text-gray-500 mt-2">{config.title}</p>}
    </div>
  );
};
