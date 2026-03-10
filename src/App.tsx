import { useState, useCallback } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { LevelSelector } from './components/LevelSelector';
import { ModeSelector } from './components/ModeSelector';
import { ContentDisplay } from './components/ContentDisplay';
import { ChatInterface } from './components/ChatInterface';
import { ProficiencyLevel, LearningMode, LearningContent, ChatMessage } from './types';
import { generateLearningContent, startConversation } from './services/gemini';
import { Globe2, Sparkles, RefreshCcw, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState('Spanish');
  const [level, setLevel] = useState<ProficiencyLevel>('Beginner');
  const [mode, setMode] = useState<LearningMode>('Story');
  const [topic, setTopic] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<LearningContent | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [view, setView] = useState<'setup' | 'content' | 'chat'>('setup');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      if (mode === 'Conversation') {
        const chat = await startConversation(language, level, topic);
        setActiveChat(chat);
        const initialMsg = `Hello! I'm your ${language} practice partner. Let's talk about ${topic || 'anything you like'}. How are you today?`;
        setChatMessages([{ role: 'model', text: initialMsg }]);
        setView('chat');
      } else {
        const result = await generateLearningContent(language, level, mode, topic);
        setContent(result);
        setView('content');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!activeChat) return;

    const newUserMsg: ChatMessage = { role: 'user', text };
    setChatMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const result = await activeChat.sendMessage({ message: text });
      const modelMsg: ChatMessage = { role: 'model', text: result.text || '' };
      setChatMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setView('setup');
    setContent(null);
    setChatMessages([]);
    setActiveChat(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Globe2 className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Polyglot</h1>
          </div>
          {view !== 'setup' && (
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Setup
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Master any language <br />
                  <span className="text-indigo-600">with Generative AI.</span>
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                  Personalized stories, dialogues, and interactive conversations tailored to your proficiency level.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                  <section className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Select Language</label>
                    <LanguageSelector selected={language} onSelect={setLanguage} />
                  </section>

                  <section className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Proficiency Level</label>
                    <LevelSelector selected={level} onSelect={setLevel} />
                  </section>

                  <section className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Learning Mode</label>
                    <ModeSelector selected={mode} onSelect={setMode} />
                  </section>
                </div>

                <div className="space-y-6">
                  <section className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Topic (Optional)</label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Ordering coffee, Travel to Tokyo, Business meeting..."
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 transition-all"
                    />
                  </section>

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Start Learning
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'content' && content && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    {level} • {mode}
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900">{language} Practice</h2>
                </div>
                <button 
                  onClick={handleGenerate}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
                  title="Regenerate"
                >
                  <RefreshCcw size={20} />
                </button>
              </div>
              
              <ContentDisplay content={content} />
            </motion.div>
          )}

          {view === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    {level} • Conversation
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900">Chatting in {language}</h2>
                </div>
              </div>

              <ChatInterface 
                messages={chatMessages} 
                onSendMessage={handleSendMessage} 
                isLoading={isLoading} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Globe2 className="text-indigo-600" size={24} />
            <span className="text-xl font-bold tracking-tight">Polyglot</span>
          </div>
          <p className="text-slate-500 text-sm">
            Powered by Google Gemini AI. Practice languages naturally.
          </p>
        </div>
      </footer>
    </div>
  );
}
