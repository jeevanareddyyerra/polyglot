import React from 'react';
import { LANGUAGES } from '../constants';

interface Props {
  selected: string;
  onSelect: (lang: string) => void;
}

export const LanguageSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
            selected === lang.code
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'
          }`}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="font-medium">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};
