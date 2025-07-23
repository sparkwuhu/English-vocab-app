// 词库管理服务
import type { Word, WordSet, SearchFilters } from '../types';
import { dbManager, STORES } from './database/indexedDB';
import { dbInitializer } from './database/initDB';

export class VocabularyService {
  private isInitialized = false;

  // 确保数据库已初始化
  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await dbInitializer.initialize();
      this.isInitialized = true;
    }
  }

  // 获取所有单词库
  async getWordSets(): Promise<WordSet[]> {
    await this.ensureInitialized();
    return await dbManager.getAll<WordSet>(STORES.WORD_SETS);
  }

  // 根据ID获取单词库
  async getWordSet(setId: string): Promise<WordSet | undefined> {
    await this.ensureInitialized();
    return await dbManager.get<WordSet>(STORES.WORD_SETS, setId);
  }

  // 获取单词库中的单词
  async getWordsFromSet(setId: string): Promise<Word[]> {
    await this.ensureInitialized();
    return await dbManager.getByIndex<Word>(STORES.WORDS, 'wordSet', setId);
  }

  // 搜索单词
  async searchWords(query: string, filters?: SearchFilters): Promise<Word[]> {
    await this.ensureInitialized();
    
    return await dbManager.search<Word>(STORES.WORDS, (word) => {
      // 按查询词过滤
      if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        const matchesWord = word.word.toLowerCase().includes(lowerQuery);
        const matchesDefinition = word.definitions.some(def => 
          def.meaning.toLowerCase().includes(lowerQuery)
        );
        
        if (!matchesWord && !matchesDefinition) {
          return false;
        }
      }

      // 按过滤条件过滤
      if (filters) {
        if (filters.difficulty && filters.difficulty.length > 0) {
          if (!filters.difficulty.includes(word.difficulty)) {
            return false;
          }
        }

        if (filters.partOfSpeech && filters.partOfSpeech.length > 0) {
          const hasMatchingPos = word.definitions.some(def =>
            filters.partOfSpeech!.includes(def.partOfSpeech)
          );
          if (!hasMatchingPos) {
            return false;
          }
        }

        if (filters.tags && filters.tags.length > 0) {
          const hasMatchingTag = filters.tags.some(tag => word.tags.includes(tag));
          if (!hasMatchingTag) {
            return false;
          }
        }

        if (filters.wordSet && word.wordSet !== filters.wordSet) {
          return false;
        }
      }

      return true;
    });
  }

  // 获取单词详情
  async getWordDetails(wordId: string): Promise<Word | undefined> {
    await this.ensureInitialized();
    return await dbManager.get<Word>(STORES.WORDS, wordId);
  }

  // 获取随机单词
  async getRandomWords(count: number, filters?: SearchFilters): Promise<Word[]> {
    await this.ensureInitialized();
    
    let availableWords: Word[];
    
    if (filters?.wordSet) {
      availableWords = await dbManager.getByIndex<Word>(STORES.WORDS, 'wordSet', filters.wordSet);
    } else {
      availableWords = await dbManager.getAll<Word>(STORES.WORDS);
    }

    // 应用其他过滤条件
    if (filters) {
      if (filters.difficulty && filters.difficulty.length > 0) {
        availableWords = availableWords.filter(word => 
          filters.difficulty!.includes(word.difficulty)
        );
      }
    }

    // 随机选择单词
    const shuffled = availableWords.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // 添加自定义单词
  async addCustomWord(word: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>): Promise<Word> {
    await this.ensureInitialized();
    
    const newWord: Word = {
      ...word,
      id: `word-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await dbManager.put(STORES.WORDS, newWord);
    return newWord;
  }

  // 获取热门标签
  async getPopularTags(): Promise<string[]> {
    await this.ensureInitialized();
    
    const allWords = await dbManager.getAll<Word>(STORES.WORDS);
    const tagCounts: { [tag: string]: number } = {};
    
    allWords.forEach(word => {
      word.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);
  }
}

// 创建单例实例
export const vocabularyService = new VocabularyService();