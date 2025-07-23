// 核心数据类型定义

export interface Word {
  id: string;
  word: string;
  pronunciation: string; // 音标
  definitions: Definition[];
  examples: Example[];
  difficulty: DifficultyLevel;
  frequency: number; // 词频 1-10000
  tags: string[];
  audioUrl?: string;
  imageUrl?: string;
  wordSet?: string; // 所属单词库
  etymology?: string; // 词源
  synonyms?: string[]; // 同义词
  antonyms?: string[]; // 反义词
  createdAt: Date;
  updatedAt: Date;
}

export interface Definition {
  id?: string;
  partOfSpeech: PartOfSpeech; // 词性
  meaning: string; // 中文释义
  englishDefinition?: string; // 英文释义
  level?: DifficultyLevel; // 该释义的难度级别
}

export interface Example {
  sentence: string;
  translation: string;
  audioUrl?: string;
}

export interface UserProgress {
  userId: string;
  wordId: string;
  masteryLevel: number; // 0-5 掌握程度
  reviewCount: number;
  correctCount: number;
  lastReviewed: Date;
  nextReview: Date;
  easeFactor: number; // 间隔重复算法参数
  interval: number; // 复习间隔(天)
}

export interface StudySession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  wordsStudied: string[];
  testResults: TestResult[];
  totalTime: number; // 秒
  sessionType: 'study' | 'review' | 'test';
}

export interface TestResult {
  wordId: string;
  testType: TestType;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  timeSpent: number; // 毫秒
}

export interface Test {
  id: string;
  type: TestType;
  questions: TestItem[];
  timeLimit?: number;
  createdAt: Date;
}

export interface TestItem {
  id: string;
  wordId: string;
  question: string;
  options?: string[]; // 选择题选项
  correctAnswer: string;
  type: TestType;
}

// 常量类型
export const DifficultyLevel = {
  BEGINNER: 1,
  ELEMENTARY: 2,
  INTERMEDIATE: 3,
  ADVANCED: 4,
  EXPERT: 5
} as const;

export type DifficultyLevel = typeof DifficultyLevel[keyof typeof DifficultyLevel];

export const TestType = {
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_IN_BLANK: 'fill_in_blank',
  LISTENING: 'listening'
} as const;

export type TestType = typeof TestType[keyof typeof TestType];

// 词性类型
export const PartOfSpeech = {
  NOUN: 'n.',           // 名词
  VERB: 'v.',           // 动词
  ADJECTIVE: 'adj.',    // 形容词
  ADVERB: 'adv.',       // 副词
  PRONOUN: 'pron.',     // 代词
  PREPOSITION: 'prep.', // 介词
  CONJUNCTION: 'conj.', // 连词
  INTERJECTION: 'int.', // 感叹词
  ARTICLE: 'art.',      // 冠词
  AUXILIARY: 'aux.',    // 助动词
  MODAL: 'modal',       // 情态动词
  PHRASAL_VERB: 'phr.v.' // 短语动词
} as const;

export type PartOfSpeech = typeof PartOfSpeech[keyof typeof PartOfSpeech];

// 学习相关类型
export interface StudyPreferences {
  dailyGoal: number;
  reviewMode: 'spaced' | 'random';
  difficultyPreference: DifficultyLevel[];
  enableAudio: boolean;
  autoPlay: boolean;
  studyReminder: boolean;
  reminderTime: string; // HH:MM格式
  theme: 'light' | 'dark' | 'auto';
}

// 性能相关类型
export interface Performance {
  accuracy: number; // 0-1
  speed: number; // 毫秒
  confidence: number; // 0-1
}

export interface ProgressStats {
  totalWordsStudied: number;
  masteredWords: number;
  studyStreak: number;
  totalStudyTime: number; // 分钟
  averageAccuracy: number;
  weeklyProgress: number[];
}

export interface ReviewSchedule {
  today: Word[];
  overdue: Word[];
  upcoming: { date: Date; words: Word[] }[];
}

// 错误处理类型
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// 搜索和过滤类型
export interface SearchFilters {
  difficulty?: DifficultyLevel[];
  partOfSpeech?: PartOfSpeech[];
  tags?: string[];
  wordSet?: string;
  masteryLevel?: number[];
}

export interface WordSet {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  wordCount: number;
  tags: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 学习算法相关类型
export interface LearningAlgorithmConfig {
  initialInterval: number; // 初始间隔(天)
  easeFactorMin: number;
  easeFactorMax: number;
  intervalMultiplier: number;
  difficultyBonus: number;
  maxInterval: number; // 最大间隔(天)
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;
}

// 统计相关类型
export interface TimeRange {
  start: Date;
  end: Date;
}

export interface StudyStats {
  date: Date;
  wordsStudied: number;
  timeSpent: number; // 分钟
  accuracy: number;
  newWords: number;
  reviewedWords: number;
}

// 应用状态类型
export interface AppState {
  user: {
    id: string;
    preferences: StudyPreferences;
    progress: ProgressStats;
    isInitialized: boolean;
  };
  vocabulary: {
    currentWordSet: Word[];
    wordSets: WordSet[];
    searchResults: Word[];
    selectedWord?: Word;
    loading: boolean;
    error?: AppError;
  };
  study: {
    currentSession?: StudySession;
    currentWord?: Word;
    wordsInSession: Word[];
    currentIndex: number;
    sessionProgress: number;
    isSessionActive: boolean;
  };
  test: {
    currentTest?: Test;
    currentQuestion: number;
    results: TestResult[];
    isTestActive: boolean;
    timeRemaining?: number;
    userAnswers: { [questionId: string]: string };
  };
}