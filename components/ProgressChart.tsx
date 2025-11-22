import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { DailyStat } from '../types';
import { PRIMARY_COLOR } from '../constants';

interface ProgressChartProps {
  data: DailyStat[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[200px] mt-8 bg-white rounded-lg border border-focus-border p-4">
      <h3 className="text-sm font-bold text-gray-700 mb-4">Monthly Consistency Wave</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9aa0a6' }}
            interval={2} // Show every 3rd day
          />
          <YAxis hide domain={[0, 1]} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            formatter={(value: number) => [`${Math.round(value * 100)}%`, 'Completion']}
            labelFormatter={(label) => `Day ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="completionPercent" 
            stroke={PRIMARY_COLOR} 
            fillOpacity={1} 
            fill="url(#colorPv)" 
            strokeWidth={2}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};