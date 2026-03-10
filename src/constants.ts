import { ProficiencyLevel, LearningMode } from './types';

export const LANGUAGES = [
  { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
  { code: 'French', name: 'French', flag: '🇫🇷' },
  { code: 'German', name: 'German', flag: '🇩🇪' },
  { code: 'Italian', name: 'Italian', flag: '🇮🇹' },
  { code: 'Japanese', name: 'Japanese', flag: '🇯🇵' },
  { code: 'Chinese', name: 'Chinese', flag: '🇨🇳' },
  { code: 'Portuguese', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'Russian', name: 'Russian', flag: '🇷🇺' },
  { code: 'English', name: 'English', flag: '🇺🇸' },
];

export const LEVELS: ProficiencyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export const MODES: { id: LearningMode; label: string; description: string }[] = [
  { 
    id: 'Story', 
    label: 'Story Mode', 
    description: 'Read an immersive story tailored to your level.' 
  },
  { 
    id: 'Dialogue', 
    label: 'Dialogue Mode', 
    description: 'Learn through realistic conversations and scenarios.' 
  },
  { 
    id: 'Vocabulary', 
    label: 'Vocabulary Practice', 
    description: 'Focus on high-frequency words and phrases.' 
  },
  { 
    id: 'Conversation', 
    label: 'Free Conversation', 
    description: 'Chat freely with an AI language partner.' 
  },
];
