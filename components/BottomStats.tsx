import React from 'react';
import { DailyStat } from '../types';
import { DAYS_IN_MONTH } from '../constants';

interface BottomStatsProps {
  data: DailyStat[];
}

export const BottomStats: React.FC<BottomStatsProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto border border-focus-border rounded-lg bg-white shadow-sm">
       <div className="min-w-[1000px]">
        <div className="grid" style={{ gridTemplateColumns: `220px repeat(${DAYS_IN_MONTH}, minmax(32px, 1fr))` }}>
          
          {/* Row Headers */}
          <div className="flex flex-col justify-evenly border-r border-focus-border bg-white p-3">
            <div className="text-xs font-bold text-gray-800 py-1">Progress</div>
            <div className="text-[11px] text-gray-500 py-1">Done</div>
            <div className="text-[11px] text-gray-500 py-1">Not Done</div>
          </div>

          {/* Data Columns */}
          {data.map((stat) => (
            <div key={stat.day} className="flex flex-col justify-evenly border-r border-gray-100 last:border-r-0 py-3 text-center bg-white">
              {/* Progress % - Matched to spreadsheet format 0% */}
              <div className="text-[10px] font-medium text-gray-800 py-1">
                {stat.completionPercent > 0 ? `${Math.round(stat.completionPercent * 100)}%` : '0%'}
              </div>
              
              {/* Done Count - Matched to font-size 8, color textGrey */}
              <div className="text-[10px] text-gray-500 py-1">
                  {stat.doneCount}
              </div>
              
              {/* Not Done Count - Matched to font-size 8, color textGrey */}
              <div className="text-[10px] text-gray-400 py-1">
                  {stat.notDoneCount}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};