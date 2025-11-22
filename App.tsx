import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_HABITS, DAYS_IN_MONTH, START_DAY_OFFSET, DAY_NAMES } from './constants';
import { TrackerState, DailyStat } from './types';
import { HeaderStats } from './components/HeaderStats';
import { HabitGrid } from './components/HabitGrid';
import { BottomStats } from './components/BottomStats';
import { ProgressChart } from './components/ProgressChart';
import { MentalStateSection } from './components/MentalStateSection';
import { LayoutDashboard, Download } from 'lucide-react';

export default function App() {
  // --- State Management ---
  const [trackerState, setTrackerState] = useState<TrackerState>(() => {
    const saved = localStorage.getItem('profocus-state');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('profocus-state', JSON.stringify(trackerState));
  }, [trackerState]);

  // --- Logic & Calculations ---
  const handleToggle = (habitId: string, day: number) => {
    setTrackerState((prev) => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        [day]: !prev[habitId]?.[day]
      }
    }));
  };

  const handleExportCSV = () => {
    // 1. Create Header Row
    let csvContent = "data:text/csv;charset=utf-8,";
    const daysHeader = Array.from({ length: DAYS_IN_MONTH }, (_, i) => `Day ${i + 1}`).join(",");
    csvContent += `Habit Name,${daysHeader}\n`;

    // 2. Create Habit Rows
    INITIAL_HABITS.forEach(habit => {
      const row = [habit.name];
      for (let d = 1; d <= DAYS_IN_MONTH; d++) {
        const isDone = trackerState[habit.id]?.[d] ? "TRUE" : "FALSE";
        row.push(isDone);
      }
      csvContent += row.join(",") + "\n";
    });

    // 3. Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "profocus_november_tracker.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dailyStats: DailyStat[] = useMemo(() => {
    const stats: DailyStat[] = [];
    for (let d = 1; d <= DAYS_IN_MONTH; d++) {
      let done = 0;
      INITIAL_HABITS.forEach(h => {
        if (trackerState[h.id]?.[d]) done++;
      });
      
      const index = (START_DAY_OFFSET + d - 1) % 7;
      const dateName = DAY_NAMES[index];

      stats.push({
        day: d,
        dateName,
        doneCount: done,
        notDoneCount: INITIAL_HABITS.length - done,
        completionPercent: done / INITIAL_HABITS.length
      });
    }
    return stats;
  }, [trackerState]);

  const totalHabitsCount = INITIAL_HABITS.length;
  const totalPossibleChecks = totalHabitsCount * DAYS_IN_MONTH;
  const totalCompletedChecks = dailyStats.reduce((acc, curr) => acc + curr.doneCount, 0);

  // --- Render ---
  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-8 font-sans text-focus-text">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-focus-green rounded flex items-center justify-center shadow-sm">
                    <LayoutDashboard className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-focus-dark tracking-tight">November</h1>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">ProFocus Lab Tracker</p>
                </div>
            </div>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => {
                        if(confirm("Reset all data?")) {
                            setTrackerState({}); 
                            localStorage.removeItem('profocus-state');
                        }
                    }}
                    className="px-4 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                >
                    Reset Sheet
                </button>
                <button 
                    onClick={handleExportCSV}
                    className="px-4 py-2 text-xs font-medium text-white bg-focus-green border border-focus-green rounded hover:bg-opacity-90 transition flex items-center gap-2 shadow-sm"
                >
                    <Download className="w-3 h-3" />
                    Export to Sheets/CSV
                </button>
            </div>
        </div>

        {/* Dashboard Stats */}
        <HeaderStats 
            totalHabits={totalHabitsCount} 
            completedCount={totalCompletedChecks}
            totalPossible={totalPossibleChecks}
        />

        {/* Main Tracker Grid */}
        <div className="bg-white mb-6">
            <HabitGrid 
                habits={INITIAL_HABITS} 
                trackerState={trackerState} 
                onToggle={handleToggle} 
            />
        </div>

        {/* Breakdown Stats Row */}
        <BottomStats data={dailyStats} />

        {/* Area Chart */}
        <ProgressChart data={dailyStats} />

        {/* Mental State & Journaling */}
        <MentalStateSection />

      </div>
    </div>
  );
}