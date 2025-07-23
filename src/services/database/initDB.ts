// 数据库初始化服务
import { dbManager, STORES } from './indexedDB';
import type { Word, WordSet } from '../../types';

export class DatabaseInitializer {
  private isInitialized = false;

  // 初始化数据库
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // 初始化IndexedDB
      await dbManager.init();
      
      // 检查是否需要导入初始数据
      await this.checkAndImportInitialData();
      
      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  // 检查并导入初始数据
  private async checkAndImportInitialData(): Promise<void> {
    try {
      // 检查是否已有数据
      const existingWordSets = await dbManager.getAll<WordSet>(STORES.WORD_SETS);
      
      if (existingWordSets.length === 0) {
        console.log('No existing data found, importing initial data...');
        await this.importInitialData();
      } else {
        console.log('Existing data found, skipping import');
      }
    } catch (error) {
      console.error('Error checking initial data:', error);
      // 如果检查失败，尝试导入数据
      await this.importInitialData();
    }
  }

  // 导入初始数据
  private async importInitialData(): Promise<void> {
    try {
      // 尝试从public/data/words.json加载数据
      const response = await fetch('/data/words.json');
      
      if (response.ok) {
        const data = await response.json();
        await this.importFromJSON(data);
      } else {
        // 如果无法加载外部数据，使用内置示例数据
        await this.importSampleData();
      }
    } catch (error) {
      console.error('Error importing initial data:', error);
      // 回退到示例数据
      await this.importSampleData();
    }
  }

  // 从JSON数据导入
  private async importFromJSON(data: any): Promise<void> {
    try {
      // 导入单词库
      if (data.wordSets && Array.isArray(data.wordSets)) {
        const wordSets: WordSet[] = data.wordSets.map((ws: any) => ({
          ...ws,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
        
        for (const wordSet of wordSets) {
          await dbManager.put(STORES.WORD_SETS, wordSet);
        }
        console.log(`Imported ${wordSets.length} word sets`);
      }

      // 导入单词
      if (data.words && Array.isArray(data.words)) {
        const words: Word[] = data.words.map((w: any) => ({
          ...w,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
        
        for (const word of words) {
          await dbManager.put(STORES.WORDS, word);
        }
        console.log(`Imported ${words.length} words`);
      }
    } catch (error) {
      console.error('Error importing from JSON:', error);
      throw error;
    }
  }

  // 导入示例数据（回退方案）
  private async importSampleData(): Promise<void> {
    const { sampleWords, sampleWordSets } = await import('../../data/sampleWords');
    
    try {
      // 导入单词库
      for (const wordSet of sampleWordSets) {
        await dbManager.put(STORES.WORD_SETS, wordSet);
      }
      
      // 导入单词
      for (const word of sampleWords) {
        await dbManager.put(STORES.WORDS, word);
      }
      
      console.log('Imported sample data as fallback');
    } catch (error) {
      console.error('Error importing sample data:', error);
      throw error;
    }
  }

  // 重置数据库
  async resetDatabase(): Promise<void> {
    try {
      await dbManager.clear(STORES.WORDS);
      await dbManager.clear(STORES.WORD_SETS);
      await dbManager.clear(STORES.USER_PROGRESS);
      await dbManager.clear(STORES.STUDY_SESSIONS);
      
      // 重新导入初始数据
      await this.importInitialData();
      
      console.log('Database reset successfully');
    } catch (error) {
      console.error('Error resetting database:', error);
      throw error;
    }
  }

  // 检查数据库状态
  async getDatabaseStatus(): Promise<{
    wordsCount: number;
    wordSetsCount: number;
    progressCount: number;
    sessionsCount: number;
  }> {
    try {
      const [words, wordSets, progress, sessions] = await Promise.all([
        dbManager.getAll(STORES.WORDS),
        dbManager.getAll(STORES.WORD_SETS),
        dbManager.getAll(STORES.USER_PROGRESS),
        dbManager.getAll(STORES.STUDY_SESSIONS)
      ]);

      return {
        wordsCount: words.length,
        wordSetsCount: wordSets.length,
        progressCount: progress.length,
        sessionsCount: sessions.length
      };
    } catch (error) {
      console.error('Error getting database status:', error);
      return {
        wordsCount: 0,
        wordSetsCount: 0,
        progressCount: 0,
        sessionsCount: 0
      };
    }
  }
}

// 创建单例实例
export const dbInitializer = new DatabaseInitializer();