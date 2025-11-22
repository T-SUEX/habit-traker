import React from 'react';
import { Habit, TrackerState } from '../types';
import { DAYS_IN_MONTH, DAY_NAMES, START_DAY_OFFSET } from '../constants';
import { Check } from 'lucide-react';

interface HabitGridProps {
  habits: Habit[];
  trackerState: TrackerState;
  onToggle: (habitId: string, day: number) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({ habits, trackerState, onToggle }) => {
  const days = Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1);
  
  // Calculate Week Spans for the Header
  // Logic matches GAS script: Weeks are ~7 days
  const weeks = [];
  let daysCounted = 0;
  let weekNum = 1;
  while (daysCounted < DAYS_IN_MONTH) {
    const remaining = DAYS_IN_MONTH - daysCounted;
    const span = Math.min(7, remaining);
    weeks.push({ 
      num: weekNum, 
      span: span,
      label: remaining >= 4 ? `Week ${weekNum}` : '' // Only show label if space permits
    });
    daysCounted += span;
    weekNum++;
  }

  const getDayName = (day: number) => {
    const index = (START_DAY_OFFSET + day - 1) % 7;
    return DAY_NAMES[index];
  };

  return (
    <div className="overflow-x-auto border border-focus-border rounded-lg shadow-sm bg-white relative">
      <div className="min-w-[1000px]"> 
        
        <div className="grid" style={{ gridTemplateColumns: `220px repeat(${DAYS_IN_MONTH}, minmax(32px, 1fr))` }}>
          
          {/* --- HEADER ROW 1: WEEK GROUPS --- */}
          {/* Top Left Corner Spacer */}
          <div className="bg-white border-b border-r border-focus-border"></div>
          
          {/* Week Spans */}
          {weeks.map((week, idx) => (
            <div 
              key={`week-${idx}`}
              className="bg-focus-light border-b border-r border-gray-200 text-xs font-medium text-gray-500 flex items-center justify-center h-8 uppercase tracking-wide"
              style={{ gridColumn: `span ${week.span}` }}
            >
              {week.label}
            </div>
          ))}

          {/* --- HEADER ROW 2: DAYS --- */}
          {/* 'My Habits' Label */}
          <div className="sticky left-0 z-20 bg-white border-b border-r border-focus-border p-3 flex items-end font-bold text-focus-dark text-sm">
            My Habits
          </div>

          {/* Day Columns */}
          {days.map((day) => (
            <div key={`head-${day}`} className="flex flex-col border-b border-r border-gray-100 last:border-r-0 h-14">
              {/* Date Number */}
              <div className="flex-1 flex items-end justify-center pb-1 font-bold text-sm text-gray-800">
                {day}
              </div>
              {/* Day Name */}
              <div className="flex-1 flex items-start justify-center pt-0 text-[10px] text-gray-500">
                {getDayName(day)}
              </div>
            </div>
          ))}

          {/* --- HABIT ROWS --- */}
          {habits.map((habit) => (
            <React.Fragment key={habit.id}>
              {/* Habit Name (Sticky Column) */}
              <div className="sticky left-0 z-10 bg-white group-hover:bg-gray-50 border-r border-b border-gray-100 p-3 text-[13px] text-gray-700 flex items-center shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] whitespace-nowrap overflow-hidden text-ellipsis">
                {habit.name}
              </div>

              {/* Checkboxes */}
              {days.map((day) => {
                const isChecked = trackerState[habit.id]?.[day] || false;
                return (
                  <div 
                    key={`${habit.id}-${day}`} 
                    className="border-r border-b border-gray-100 last:border-r-0 flex items-center justify-center p-1 relative hover:bg-gray-50 transition-colors"
                  >
                    <label className="cursor-pointer w-full h-full flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={isChecked}
                        onChange={() => onToggle(habit.id, day)}
                      />
                      <div className={`w-5 h-5 rounded-[3px] border transition-all duration-200 flex items-center justify-center
                        ${isChecked 
                          ? 'bg-focus-green border-focus-green' 
                          : 'bg-transparent border-gray-300 hover:border-focus-green'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                      </div>
                    </label>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};