import React, { useState } from 'react';
import { Smile, Meh, Frown, Sun, Cloud } from 'lucide-react';

export const MentalStateSection: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const moods = [
    { id: 'Great', icon: Sun, label: 'Great' },
    { id: 'Good', icon: Smile, label: 'Good' },
    { id: 'Neutral', icon: Meh, label: 'Neutral' },
    { id: 'Low', icon: Cloud, label: 'Low' },
    { id: 'Bad', icon: Frown, label: 'Bad' },
  ];

  return (
    <div className="mt-8 p-6 bg-focus-light rounded-lg border border-focus-border">
      <h3 className="text-sm font-bold text-focus-dark mb-4 uppercase tracking-wider">Mental State & Reflection</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-3">HOW ARE YOU FEELING TODAY?</label>
          <div className="flex gap-3">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border transition-all duration-200
                    ${isSelected 
                      ? 'bg-white border-focus-green shadow-md scale-110 text-focus-green' 
                      : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <Icon size={20} />
                  <span className="text-[9px] mt-1 font-medium">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-[2]">
          <label className="block text-xs font-medium text-gray-500 mb-3">QUICK JOURNAL</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What went well? What can be improved tomorrow?"
            className="w-full h-24 p-3 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-focus-green focus:border-transparent resize-none bg-white"
          />
        </div>
      </div>
    </div>
  );
};