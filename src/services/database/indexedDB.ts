// IndexedDB 数据库管理
import type { Word, WordSet, UserProgress, StudySession } from '../../types';

const DB_NAME = 'VocabLearningDB';
const DB_VERSION = 1;

// 数据库表名
export const STORES = {
  WORDS: 'words',
  WORD_SETS: 'wordSets', 
  USER_PROGRESS: 'userProgress',
  STUDY_SESSIONS: 'studySessions',
  SETTINGS: 'settings'
} as const;

export class IndexedDBManager {
  private db: IDBDatabase | null = null;

  // 初始化数据库
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createStores(db);
      };
    });
  }

  // 创建数据库表
  private createStores(db: IDBDatabase): void {
    // 单词表
    if (!db.objectStoreNames.contains(STORES.WORDS)) {
      const wordsStore = db.createObjectStore(STORES.WORDS, { keyPath: 'id' });
      wordsStore.createIndex('word', 'word', { unique: false });
      wordsStore.createIndex('wordSet', 'wordSet', { unique: false });
      wordsStore.createIndex('difficulty', 'difficulty', { unique: false });
      wordsStore.createIndex('frequency', 'frequency', { unique: false });
    }

    // 单词库表
    if (!db.objectStoreNames.contains(STORES.WORD_SETS)) {
      const wordSetsStore = db.createObjectStore(STORES.WORD_SETS, { keyPath: 'id' });
      wordSetsStore.createIndex('difficulty', 'difficulty', { unique: false });
      wordSetsStore.createIndex('isDefault', 'isDefault', { unique: false });
    }

    // 用户进度表
    if (!db.objectStoreNames.contains(STORES.USER_PROGRESS)) {
      const progressStore = db.createObjectStore(STORES.USER_PROGRESS, { keyPath: ['userId', 'wordId'] });
      progressStore.createIndex('userId', 'userId', { unique: false });
      progressStore.createIndex('wordId', 'wordId', { unique: false });
      progressStore.createIndex('masteryLevel', 'masteryLevel', { unique: false });
      progressStore.createIndex('nextReview', 'nextReview', { unique: false });
    }

    // 学习会话表
    if (!db.objectStoreNames.contains(STORES.STUDY_SESSIONS)) {
      const sessionsStore = db.createObjectStore(STORES.STUDY_SESSIONS, { keyPath: 'id' });
      sessionsStore.createIndex('userId', 'userId', { unique: false });
      sessionsStore.createIndex('startTime', 'startTime', { unique: false });
      sessionsStore.createIndex('sessionType', 'sessionType', { unique: false });
    }

    // 设置表
    if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
      db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
    }
  }

  // 通用的数据库操作方法
  private async performTransaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // 添加数据
  async add<T>(storeName: string, data: T): Promise<void> {
    await this.performTransaction(storeName, 'readwrite', (store) => store.add(data));
  }

  // 更新数据
  async put<T>(storeName: string, data: T): Promise<void> {
    await this.performTransaction(storeName, 'readwrite', (store) => store.put(data));
  }

  // 获取单个数据
  async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    return await this.performTransaction(storeName, 'readonly', (store) => store.get(key));
  }

  // 获取所有数据
  async getAll<T>(storeName: string): Promise<T[]> {
    return await this.performTransaction(storeName, 'readonly', (store) => store.getAll());
  }

  // 根据索引查询
  async getByIndex<T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // 删除数据
  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    await this.performTransaction(storeName, 'readwrite', (store) => store.delete(key));
  }

  // 清空表
  async clear(storeName: string): Promise<void> {
    await this.performTransaction(storeName, 'readwrite', (store) => store.clear());
  }

  // 批量操作
  async bulkAdd<T>(storeName: string, items: T[]): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      let completed = 0;
      const total = items.length;

      if (total === 0) {
        resolve();
        return;
      }

      items.forEach((item) => {
        const request = store.add(item);
        
        request.onsuccess = () => {
          completed++;
          if (completed === total) {
            resolve();
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    });
  }

  // 搜索功能
  async search<T>(
    storeName: string, 
    searchFn: (item: T) => boolean
  ): Promise<T[]> {
    const allItems = await this.getAll<T>(storeName);
    return allItems.filter(searchFn);
  }

  // 关闭数据库连接
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// 创建单例实例
export const dbManager = new IndexedDBManager();