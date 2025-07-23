import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Word, WordSet, AppError, SearchFilters } from '../../types';
import { vocabularyService } from '../../services/vocabularyService';

interface VocabularyState {
  currentWordSet: Word[];
  wordSets: WordSet[];
  searchResults: Word[];
  selectedWord?: Word;
  loading: boolean;
  error?: AppError;
  popularTags: string[];
}

const initialState: VocabularyState = {
  currentWordSet: [],
  wordSets: [],
  searchResults: [],
  loading: false,
  popularTags: [],
};

// 异步操作
export const loadWordSets = createAsyncThunk(
  'vocabulary/loadWordSets',
  async () => {
    const wordSets = await vocabularyService.getWordSets();
    return wordSets;
  }
);

export const loadWordsFromSet = createAsyncThunk(
  'vocabulary/loadWordsFromSet',
  async (setId: string) => {
    const words = await vocabularyService.getWordsFromSet(setId);
    return words;
  }
);

export const searchWords = createAsyncThunk(
  'vocabulary/searchWords',
  async ({ query, filters }: { query: string; filters?: SearchFilters }) => {
    const results = await vocabularyService.searchWords(query, filters);
    return results;
  }
);

export const loadPopularTags = createAsyncThunk(
  'vocabulary/loadPopularTags',
  async () => {
    const tags = await vocabularyService.getPopularTags();
    return tags;
  }
);

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    selectWord: (state, action: PayloadAction<Word>) => {
      state.selectedWord = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 加载单词库
      .addCase(loadWordSets.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadWordSets.fulfilled, (state, action) => {
        state.loading = false;
        state.wordSets = action.payload;
      })
      .addCase(loadWordSets.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          code: 'LOAD_WORDSETS_ERROR',
          message: action.error.message || '加载单词库失败',
        };
      })
      // 加载单词库中的单词
      .addCase(loadWordsFromSet.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadWordsFromSet.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWordSet = action.payload;
      })
      .addCase(loadWordsFromSet.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          code: 'LOAD_WORDS_ERROR',
          message: action.error.message || '加载单词失败',
        };
      })
      // 搜索单词
      .addCase(searchWords.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          code: 'SEARCH_ERROR',
          message: action.error.message || '搜索失败',
        };
      })
      // 加载热门标签
      .addCase(loadPopularTags.fulfilled, (state, action) => {
        state.popularTags = action.payload;
      });
  },
});

export const {
  selectWord,
  clearError,
  clearSearchResults,
} = vocabularySlice.actions;

export default vocabularySlice.reducer;