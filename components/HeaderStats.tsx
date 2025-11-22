import React from 'react';
import { Sparkline } from './Sparkline';

interface HeaderStatsProps {
  totalHabits: number;
  completedCount: number;
  totalPossible: number;
}

export const HeaderStats: React.FC<HeaderStatsProps> = ({ totalHabits, completedCount, totalPossible }) => {
  const overallProgress = totalPossible > 0 ? completedCount / totalPossible : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-focus-light border border-focus-border rounded-lg p-4 mb-6 shadow-sm">
      {/* Card 1: Number of Habits */}
      <div className="flex flex-col items-center justify-center border-r border-gray-200 last:border-0">
        <span className="text-xs text-focus-text uppercase tracking-wide mb-1">Number of habits</span>
        <span className="text-2xl font-bold text-focus-dark">{totalHabits}</span>
      </div>

      {/* Card 2: Completed Habits */}
      <div className="flex flex-col items-center justify-center border-r border-gray-200 last:border-0">
        <span className="text-xs text-focus-text uppercase tracking-wide mb-1">Completed habits</span>
        <span className="text-2xl font-bold text-focus-dark">{completedCount}</span>
      </div>

      {/* Card 3: Progress */}
      <div className="flex flex-col items-center justify-center w-full px-4">
        <span className="text-xs text-focus-text uppercase tracking-wide mb-1">Progress</span>
        <div className="w-full max-w-[150px]">
             <Sparkline percent={overallProgress} />
             <div className="text-center text-xs font-bold mt-1 text-focus-green">
                {(overallProgress * 100).toFixed(1)}%
             </div>
        </div>
      </div>
    </div>
  );
};