import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { LearningContent, ProficiencyLevel, LearningMode, ChatMessage } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const learningContentSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    content: { type: Type.STRING },
    vocabulary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          translation: { type: Type.STRING },
          example: { type: Type.STRING },
        },
        required: ["word", "translation", "example"],
      },
    },
    comprehensionQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ["title", "content", "vocabulary", "comprehensionQuestions"],
};

export async function generateLearningContent(
  language: string,
  level: ProficiencyLevel,
  mode: LearningMode,
  topic?: string
): Promise<LearningContent> {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    Act as a professional language tutor for ${language}.
    Generate a ${mode.toLowerCase()} for a ${level.toLowerCase()} student.
    ${topic ? `The topic should be: ${topic}.` : "Choose an engaging and practical topic."}
    
    The content must be entirely in ${language} (except for translations).
    Adjust the complexity, grammar, and vocabulary strictly for the ${level} level.
    - Beginner: Simple present tense, basic vocabulary, short sentences.
    - Intermediate: Past and future tenses, more complex sentence structures, common idioms.
    - Advanced: Nuanced vocabulary, complex grammar (subjunctive, etc.), cultural references.
  `;

  const response = await genAI.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: learningContentSchema,
    },
  });

  return JSON.parse(response.text || "{}") as LearningContent;
}

export async function startConversation(
  language: string,
  level: ProficiencyLevel,
  topic: string = "General conversation"
) {
  const model = "gemini-3.1-pro-preview";
  
  const chat = genAI.chats.create({
    model,
    config: {
      systemInstruction: `
        You are a friendly and patient language partner for someone learning ${language}.
        The user's proficiency level is ${level}.
        Your goal is to have a natural conversation in ${language}.
        
        Guidelines:
        1. Speak ONLY in ${language}.
        2. Keep your responses appropriate for the ${level} level.
        3. If the user makes a significant mistake, gently correct them in a separate line starting with "Correction:".
        4. Ask open-ended questions to keep the conversation going.
        5. The current topic is: ${topic}.
      `,
    },
  });

  return chat;
}
