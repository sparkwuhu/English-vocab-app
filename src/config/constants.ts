// 应用常量配置

export const APP_CONFIG = {
  name: '英语单词学习应用',
  version: '1.0.0',
  author: 'Kiro AI',
};

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'vocab_user_preferences',
  USER_PROGRESS: 'vocab_user_progress',
  STUDY_SESSIONS: 'vocab_study_sessions',
  WORD_CACHE: 'vocab_word_cache',
};

export const DEFAULT_SETTINGS = {
  DAILY_GOAL: 20,
  SESSION_SIZE: 10,
  REVIEW_INTERVAL_MULTIPLIER: 2.5,
  MIN_REVIEW_INTERVAL: 1, // 天
  MAX_REVIEW_INTERVAL: 365, // 天
};

export const DIFFICULTY_COLORS = {
  1: '#4CAF50', // 绿色 - 初级
  2: '#8BC34A', // 浅绿 - 基础
  3: '#FFC107', // 黄色 - 中级
  4: '#FF9800', // 橙色 - 高级
  5: '#F44336', // 红色 - 专家
};

export const TEST_CONFIG = {
  MULTIPLE_CHOICE_OPTIONS: 4,
  DEFAULT_TIME_LIMIT: 300, // 5分钟
  PASSING_SCORE: 0.7, // 70%
};