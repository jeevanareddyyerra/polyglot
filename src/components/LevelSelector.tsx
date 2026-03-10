import React from 'react';
import { LEVELS } from '../constants';
import { ProficiencyLevel } from '../types';

interface Props {
  selected: ProficiencyLevel;
  onSelect: (level: ProficiencyLevel) => void;
}

export const LevelSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-2">
      {LEVELS.map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`flex-1 px-4 py-3 rounded-xl border transition-all font-semibold ${
            selected === level
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};
