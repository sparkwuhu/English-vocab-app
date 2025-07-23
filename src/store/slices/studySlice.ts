import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StudySession, Word } from '../../types';

interface StudyState {
  currentSession?: StudySession;
  currentWord?: Word;
  sessionProgress: number;
  wordsInSession: Word[];
  currentIndex: number;
  isSessionActive: boolean;
}

const initialState: StudyState = {
  sessionProgress: 0,
  wordsInSession: [],
  currentIndex: 0,
  isSessionActive: false,
};

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<{ session: StudySession; words: Word[] }>) => {
      state.currentSession = action.payload.session;
      state.wordsInSession = action.payload.words;
      state.currentIndex = 0;
      state.currentWord = action.payload.words[0];
      state.sessionProgress = 0;
      state.isSessionActive = true;
    },
    nextWord: (state) => {
      if (state.currentIndex < state.wordsInSession.length - 1) {
        state.currentIndex += 1;
        state.currentWord = state.wordsInSession[state.currentIndex];
        state.sessionProgress = (state.currentIndex / state.wordsInSession.length) * 100;
      }
    },
    previousWord: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentWord = state.wordsInSession[state.currentIndex];
        state.sessionProgress = (state.currentIndex / state.wordsInSession.length) * 100;
      }
    },
    endSession: (state) => {
      state.isSessionActive = false;
      state.sessionProgress = 100;
      if (state.currentSession) {
        state.currentSession.endTime = new Date();
      }
    },
    updateSessionProgress: (state, action: PayloadAction<number>) => {
      state.sessionProgress = action.payload;
    },
    resetSession: () => {
      return initialState;
    },
  },
});

export const {
  startSession,
  nextWord,
  previousWord,
  endSession,
  updateSessionProgress,
  resetSession,
} = studySlice.actions;

export default studySlice.reducer;