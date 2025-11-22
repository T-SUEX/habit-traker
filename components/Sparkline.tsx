import React from 'react';
import { PRIMARY_COLOR } from '../constants';

interface SparklineProps {
  percent: number;
}

export const Sparkline: React.FC<SparklineProps> = ({ percent }) => {
  const width = 100;
  const height = 8;
  const fillWidth = Math.min(Math.max(percent * width, 0), width);

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-500 ease-out"
        style={{ 
          width: `${fillWidth}%`,
          backgroundColor: PRIMARY_COLOR
        }}
      />
    </div>
  );
};