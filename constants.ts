import { Habit } from './types';

export const INITIAL_HABITS: Habit[] = [
  { id: 'h1', name: 'Wake up at 05:00' },
  { id: 'h2', name: 'Gym' },
  { id: 'h3', name: 'Reading / Learning' },
  { id: 'h4', name: 'Day Planning' },
  { id: 'h5', name: 'Budget Tracking' },
  { id: 'h6', name: 'Project Work' },
  { id: 'h7', name: 'No Alcohol' },
  { id: 'h8', name: 'Social Media Detox' },
  { id: 'h9', name: 'Goal Journaling' },
  { id: 'h10', name: 'Cold Shower' },
];

export const DAYS_IN_MONTH = 30; // Simulating November
export const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Start day offset for November 2023 (Wednesday start) or just mock generic
// Let's assume Day 1 is Wednesday to match a generic month or current context
export const START_DAY_OFFSET = 3; 

export const PRIMARY_COLOR = "#4b9c6c";