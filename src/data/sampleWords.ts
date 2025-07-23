// 示例单词数据
import type { Word, WordSet } from '../types';
import { DifficultyLevel, PartOfSpeech } from '../types';

// 示例单词数据
export const sampleWords: Word[] = [
  {
    id: 'word-1',
    word: 'hello',
    pronunciation: '/həˈloʊ/',
    definitions: [
      {
        id: 'def-1',
        partOfSpeech: PartOfSpeech.INTERJECTION,
        meaning: '你好，问候语',
        englishDefinition: 'used as a greeting or to begin a phone conversation'
      }
    ],
    examples: [
      {
        sentence: 'Hello, how are you today?',
        translation: '你好，你今天怎么样？'
      }
    ],
    difficulty: DifficultyLevel.BEGINNER,
    frequency: 9500,
    tags: ['greeting', 'basic'],
    wordSet: 'basic-english',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'word-2',
    word: 'beautiful',
    pronunciation: '/ˈbjuːtɪfəl/',
    definitions: [
      {
        id: 'def-2',
        partOfSpeech: PartOfSpeech.ADJECTIVE,
        meaning: '美丽的，漂亮的',
        englishDefinition: 'pleasing the senses or mind aesthetically'
      }
    ],
    examples: [
      {
        sentence: 'She has a beautiful smile.',
        translation: '她有一个美丽的笑容。'
      },
      {
        sentence: 'The sunset is beautiful tonight.',
        translation: '今晚的日落很美。'
      }
    ],
    difficulty: DifficultyLevel.ELEMENTARY,
    frequency: 7800,
    tags: ['adjective', 'description'],
    wordSet: 'basic-english',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'word-3',
    word: 'understand',
    pronunciation: '/ˌʌndərˈstænd/',
    definitions: [
      {
        id: 'def-3',
        partOfSpeech: PartOfSpeech.VERB,
        meaning: '理解，明白',
        englishDefinition: 'perceive the intended meaning of words, a language, or speaker'
      }
    ],
    examples: [
      {
        sentence: 'I understand what you mean.',
        translation: '我明白你的意思。'
      },
      {
        sentence: 'Do you understand the lesson?',
        translation: '你理解这节课吗？'
      }
    ],
    difficulty: DifficultyLevel.INTERMEDIATE,
    frequency: 8200,
    tags: ['verb', 'cognition'],
    wordSet: 'basic-english',
    synonyms: ['comprehend', 'grasp'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'word-4',
    word: 'knowledge',
    pronunciation: '/ˈnɑːlɪdʒ/',
    definitions: [
      {
        id: 'def-4',
        partOfSpeech: PartOfSpeech.NOUN,
        meaning: '知识，学问',
        englishDefinition: 'facts, information, and skills acquired through experience or education'
      }
    ],
    examples: [
      {
        sentence: 'Knowledge is power.',
        translation: '知识就是力量。'
      },
      {
        sentence: 'She has extensive knowledge of history.',
        translation: '她对历史有广泛的知识。'
      }
    ],
    difficulty: DifficultyLevel.INTERMEDIATE,
    frequency: 6500,
    tags: ['noun', 'education'],
    wordSet: 'academic-english',
    synonyms: ['wisdom', 'learning'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'word-5',
    word: 'extraordinary',
    pronunciation: '/ɪkˈstrɔːrdəneri/',
    definitions: [
      {
        id: 'def-5',
        partOfSpeech: PartOfSpeech.ADJECTIVE,
        meaning: '非凡的，特别的',
        englishDefinition: 'very unusual or remarkable'
      }
    ],
    examples: [
      {
        sentence: 'She has extraordinary talent.',
        translation: '她有非凡的天赋。'
      },
      {
        sentence: 'It was an extraordinary experience.',
        translation: '这是一次非凡的经历。'
      }
    ],
    difficulty: DifficultyLevel.ADVANCED,
    frequency: 3200,
    tags: ['adjective', 'advanced'],
    wordSet: 'advanced-english',
    synonyms: ['remarkable', 'exceptional'],
    antonyms: ['ordinary', 'common'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'word-6',
    word: 'serendipity',
    pronunciation: '/ˌserənˈdɪpəti/',
    definitions: [
      {
        id: 'def-6',
        partOfSpeech: PartOfSpeech.NOUN,
        meaning: '意外发现，机缘巧合',
        englishDefinition: 'the occurrence and development of events by chance in a happy or beneficial way'
      }
    ],
    examples: [
      {
        sentence: 'Meeting you was pure serendipity.',
        translation: '遇见你纯属机缘巧合。'
      }
    ],
    difficulty: DifficultyLevel.EXPERT,
    frequency: 800,
    tags: ['noun', 'advanced', 'rare'],
    wordSet: 'advanced-english',
    etymology: 'coined by Horace Walpole in 1754',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// 示例单词库
export const sampleWordSets: WordSet[] = [
  {
    id: 'junior-high',
    name: '初中英语',
    description: '初中阶段必备英语词汇',
    difficulty: DifficultyLevel.BEGINNER,
    wordCount: 1200,
    tags: ['junior', 'basic'],
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'senior-high',
    name: '高中英语',
    description: '高中阶段核心英语词汇',
    difficulty: DifficultyLevel.ELEMENTARY,
    wordCount: 2000,
    tags: ['senior', 'high-school'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cet4',
    name: '英语四级',
    description: '大学英语四级考试词汇',
    difficulty: DifficultyLevel.INTERMEDIATE,
    wordCount: 4500,
    tags: ['cet4', 'college'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'cet6',
    name: '英语六级',
    description: '大学英语六级考试词汇',
    difficulty: DifficultyLevel.ADVANCED,
    wordCount: 6000,
    tags: ['cet6', 'advanced'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// 根据单词库ID获取单词
export const getWordsBySet = (setId: string): Word[] => {
  return sampleWords.filter(word => word.wordSet === setId);
};

// 获取所有单词
export const getAllWords = (): Word[] => {
  return sampleWords;
};

// 根据难度获取单词
export const getWordsByDifficulty = (difficulty: DifficultyLevel): Word[] => {
  return sampleWords.filter(word => word.difficulty === difficulty);
};