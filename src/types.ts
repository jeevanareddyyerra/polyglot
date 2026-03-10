export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type LearningMode = 'Story' | 'Dialogue' | 'Vocabulary' | 'Conversation';

export interface VocabularyItem {
  word: string;
  translation: string;
  example: string;
}

export interface LearningContent {
  title: string;
  content: string;
  vocabulary: VocabularyItem[];
  comprehensionQuestions: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
