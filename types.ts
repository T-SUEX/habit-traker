export interface Habit {
  id: string;
  name: string;
}

export interface DayRecord {
  [day: number]: boolean;
}

export interface TrackerState {
  [habitId: string]: DayRecord;
}

export interface DailyStat {
  day: number;
  dateName: string;
  completionPercent: number;
  doneCount: number;
  notDoneCount: number;
}

export interface MentalStateLog {
  date: string;
  mood: 'Great' | 'Good' | 'Neutral' | 'Low' | 'Bad' | null;
  note: string;
}