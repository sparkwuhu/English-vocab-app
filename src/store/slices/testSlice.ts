import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Test, TestResult } from '../../types';

interface TestState {
  currentTest?: Test;
  currentQuestion: number;
  results: TestResult[];
  isTestActive: boolean;
  timeRemaining?: number;
  userAnswers: { [questionId: string]: string };
}

const initialState: TestState = {
  currentQuestion: 0,
  results: [],
  isTestActive: false,
  userAnswers: {},
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    startTest: (state, action: PayloadAction<Test>) => {
      state.currentTest = action.payload;
      state.currentQuestion = 0;
      state.results = [];
      state.isTestActive = true;
      state.userAnswers = {};
      state.timeRemaining = action.payload.timeLimit;
    },
    nextQuestion: (state) => {
      if (state.currentTest && state.currentQuestion < state.currentTest.questions.length - 1) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    submitAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },
    addTestResult: (state, action: PayloadAction<TestResult>) => {
      state.results.push(action.payload);
    },
    endTest: (state) => {
      state.isTestActive = false;
    },
    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },
    resetTest: () => {
      return initialState;
    },
  },
});

export const {
  startTest,
  nextQuestion,
  previousQuestion,
  submitAnswer,
  addTestResult,
  endTest,
  updateTimeRemaining,
  resetTest,
} = testSlice.actions;

export default testSlice.reducer;