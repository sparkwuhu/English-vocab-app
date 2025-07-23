import { configureStore } from '@reduxjs/toolkit';
import vocabularyReducer from './slices/vocabularySlice.ts';
import studyReducer from './slices/studySlice';
import testReducer from './slices/testSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    vocabulary: vocabularyReducer,
    study: studyReducer,
    test: testReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;