import React from 'react';
import { LearningContent } from '../types';
import { motion } from 'motion/react';
import { Book, Lightbulb, HelpCircle } from 'lucide-react';

interface Props {
  content: LearningContent;
}

export const ContentDisplay: React.FC<Props> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900">{content.title}</h2>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
            {content.content}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-amber-600" />
            <h3 className="text-xl font-bold text-amber-900">Key Vocabulary</h3>
          </div>
          <div className="space-y-4">
            {content.vocabulary.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-indigo-600 text-lg">{item.word}</span>
                  <span className="text-slate-500 text-sm italic">{item.translation}</span>
                </div>
                <p className="text-slate-600 text-sm">{item.example}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-indigo-600" />
            <h3 className="text-xl font-bold text-indigo-900">Comprehension</h3>
          </div>
          <div className="space-y-4">
            {content.comprehensionQuestions.map((q, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="bg-indigo-200 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {idx + 1}
                </span>
                <p className="text-slate-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
