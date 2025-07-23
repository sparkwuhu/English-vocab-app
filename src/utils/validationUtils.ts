// 数据验证工具函数
import type { Word, Definition, Example, WordSet, StudyPreferences } from '../types';
import { DifficultyLevel, PartOfSpeech } from '../types';

export const validateWord = (word: Partial<Word>): boolean => {
  if (!word.id || !word.word || !word.pronunciation) {
    return false;
  }
  
  if (!word.definitions || word.definitions.length === 0) {
    return false;
  }
  
  return word.definitions.every(validateDefinition);
};

export const validateDefinition = (definition: Partial<Definition>): boolean => {
  return !!(definition.partOfSpeech && definition.meaning);
};

export const validateExample = (example: Partial<Example>): boolean => {
  return !!(example.sentence && example.translation);
};

export const validateWordSet = (wordSet: Partial<WordSet>): boolean => {
  return !!(
    wordSet.id && 
    wordSet.name && 
    wordSet.description && 
    wordSet.difficulty &&
    Object.values(DifficultyLevel).includes(wordSet.difficulty)
  );
};

export const validateStudyPreferences = (preferences: Partial<StudyPreferences>): boolean => {
  if (!preferences.dailyGoal || preferences.dailyGoal < 1 || preferences.dailyGoal > 100) {
    return false;
  }
  
  if (!preferences.reviewMode || !['spaced', 'random'].includes(preferences.reviewMode)) {
    return false;
  }
  
  return true;
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const sanitizeWord = (word: string): string => {
  return word.toLowerCase().trim().replace(/[^a-zA-Z\s-']/g, '');
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidNumber = (value: any, min?: number, max?: number): boolean => {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};

export const isValidDifficulty = (difficulty: any): difficulty is DifficultyLevel => {
  return Object.values(DifficultyLevel).includes(difficulty);
};

export const isValidPartOfSpeech = (pos: any): pos is PartOfSpeech => {
  return Object.values(PartOfSpeech).includes(pos);
};

// 验证单词搜索查询
export const validateSearchQuery = (query: string): boolean => {
  if (!query || query.trim().length === 0) return false;
  if (query.trim().length > 50) return false;
  return true;
};

// 验证时间格式 (HH:MM)
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// 数据清理函数
export const cleanWordData = (word: Partial<Word>): Partial<Word> => {
  return {
    ...word,
    word: word.word ? sanitizeWord(word.word) : word.word,
    definitions: word.definitions?.map(def => ({
      ...def,
      meaning: def.meaning ? sanitizeString(def.meaning) : def.meaning,
      englishDefinition: def.englishDefinition ? sanitizeString(def.englishDefinition) : def.englishDefinition
    })),
    examples: word.examples?.map(ex => ({
      ...ex,
      sentence: ex.sentence ? sanitizeString(ex.sentence) : ex.sentence,
      translation: ex.translation ? sanitizeString(ex.translation) : ex.translation
    })),
    tags: word.tags?.map(tag => sanitizeString(tag).toLowerCase())
  };
};