import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StudyPreferences, ProgressStats } from '../../types';
import { DifficultyLevel } from '../../types';

interface UserState {
  id: string;
  preferences: StudyPreferences;
  progress: ProgressStats;
  isInitialized: boolean;
}

const initialState: UserState = {
  id: 'default-user',
  preferences: {
    dailyGoal: 20,
    reviewMode: 'spaced',
    difficultyPreference: [DifficultyLevel.BEGINNER, DifficultyLevel.ELEMENTARY],
    enableAudio: true,
    autoPlay: false,
  },
  progress: {
    totalWordsStudied: 0,
    masteredWords: 0,
    studyStreak: 0,
    totalStudyTime: 0,
    averageAccuracy: 0,
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
  },
  isInitialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<{ id: string }>) => {
      state.id = action.payload.id;
      state.isInitialized = true;
    },
    updatePreferences: (state, action: PayloadAction<Partial<StudyPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateProgress: (state, action: PayloadAction<Partial<ProgressStats>>) => {
      state.progress = { ...state.progress, ...action.payload };
    },
    incrementWordsStudied: (state, action: PayloadAction<number>) => {
      state.progress.totalWordsStudied += action.payload;
    },
    incrementStudyTime: (state, action: PayloadAction<number>) => {
      state.progress.totalStudyTime += action.payload;
    },
    updateStudyStreak: (state, action: PayloadAction<number>) => {
      state.progress.studyStreak = action.payload;
    },
    updateWeeklyProgress: (state, action: PayloadAction<number[]>) => {
      state.progress.weeklyProgress = action.payload;
    },
  },
});

export const {
  initializeUser,
  updatePreferences,
  updateProgress,
  incrementWordsStudied,
  incrementStudyTime,
  updateStudyStreak,
  updateWeeklyProgress,
} = userSlice.actions;

export default userSlice.reducer;