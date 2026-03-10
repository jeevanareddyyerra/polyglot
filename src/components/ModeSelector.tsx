import React from 'react';
import { MODES } from '../constants';
import { LearningMode } from '../types';
import { BookOpen, MessageSquare, List, Sparkles } from 'lucide-react';

interface Props {
  selected: LearningMode;
  onSelect: (mode: LearningMode) => void;
}

const icons = {
  Story: BookOpen,
  Dialogue: MessageSquare,
  Vocabulary: List,
  Conversation: Sparkles,
};

export const ModeSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MODES.map((mode) => {
        const Icon = icons[mode.id];
        return (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className={`p-4 rounded-2xl border text-left transition-all group ${
              selected === mode.id
                ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                selected === mode.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'
              }`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className={`font-bold ${selected === mode.id ? 'text-indigo-900' : 'text-slate-900'}`}>
                  {mode.label}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {mode.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
