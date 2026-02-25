import { Injectable } from '@angular/core';

// Generic interfaces for different store types
export interface BaseStoreItem {
  id: string;
  [key: string]: any;
}

export interface StoreConfig {
  storeName: string;
  keyPath: string;
  indexes?: Array<{
    name: string;
    keyPath: string | string[];
    unique?: boolean;
  }>;
}

export interface DatabaseConfig {
  name: string;
  version: number;
  stores: StoreConfig[];
}

// Specific interfaces for cycle count
export interface CycleCountItem extends BaseStoreItem {
  stockDetailId: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  batch: string;
  expiryDate: string;
  auditedQuantity: number | null;
  branchToDepartmentId: number;
  isNewItem?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private databases: Map<string, IDBDatabase> = new Map();

  constructor() {}

  private async openDatabase(config: DatabaseConfig): Promise<IDBDatabase> {
    const cacheKey = `${config.name}_v${config.version}`;
    
    if (this.databases.has(cacheKey)) {
      return this.databases.get(cacheKey)!;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(config.name, config.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        this.databases.set(cacheKey, db);
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        config.stores.forEach(storeConfig => {
          if (!db.objectStoreNames.contains(storeConfig.storeName)) {
            const store = db.createObjectStore(storeConfig.storeName, { 
              keyPath: storeConfig.keyPath 
            });
            
            if (storeConfig.indexes) {
              storeConfig.indexes.forEach(index => {
                store.createIndex(index.name, index.keyPath, { 
                  unique: index.unique || false 
                });
              });
            }
          }
        });
      };
    });
  }

  async saveItem<T extends BaseStoreItem>(
    config: DatabaseConfig, 
    storeName: string, 
    item: T
  ): Promise<void> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.put(item);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error saving item to ${storeName}:`, error);
      throw error;
    }
  }

  async saveItems<T extends BaseStoreItem>(
    config: DatabaseConfig, 
    storeName: string, 
    items: T[]
  ): Promise<void> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      for (const item of items) {
        await new Promise<void>((resolve, reject) => {
          const request = store.put(item);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
    } catch (error) {
      console.error(`Error saving items to ${storeName}:`, error);
      throw error;
    }
  }

  async getItem<T extends BaseStoreItem>(
    config: DatabaseConfig, 
    storeName: string, 
    id: string
  ): Promise<T | undefined> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);

      return new Promise<T | undefined>((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error getting item from ${storeName}:`, error);
      return undefined;
    }
  }

  async getAllItems<T extends BaseStoreItem>(
    config: DatabaseConfig, 
    storeName: string
  ): Promise<T[]> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);

      return new Promise<T[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error getting all items from ${storeName}:`, error);
      return [];
    }
  }

  async getItemsByIndex<T extends BaseStoreItem>(
    config: DatabaseConfig, 
    storeName: string, 
    indexName: string, 
    value: any
  ): Promise<T[]> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);

      const items: T[] = [];

      return new Promise<T[]>((resolve, reject) => {
        const request = index.openCursor(IDBKeyRange.only(value));
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            items.push(cursor.value);
            cursor.continue();
          } else {
            resolve(items);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error getting items by index from ${storeName}:`, error);
      return [];
    }
  }

  async deleteItem(
    config: DatabaseConfig, 
    storeName: string, 
    id: string
  ): Promise<void> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error deleting item from ${storeName}:`, error);
      throw error;
    }
  }

  async deleteItemsByIndex(
    config: DatabaseConfig, 
    storeName: string, 
    indexName: string, 
    value: any
  ): Promise<void> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);

      await new Promise<void>((resolve, reject) => {
        const request = index.openCursor(IDBKeyRange.only(value));
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          } else {
            resolve();
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error deleting items by index from ${storeName}:`, error);
      throw error;
    }
  }

  async clearStore(config: DatabaseConfig, storeName: string): Promise<void> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`Error clearing store ${storeName}:`, error);
      throw error;
    }
  }

  async executeTransaction<T>(
    config: DatabaseConfig,
    storeNames: string[],
    mode: IDBTransactionMode,
    operation: (stores: { [storeName: string]: IDBObjectStore }) => Promise<T>
  ): Promise<T> {
    try {
      const db = await this.openDatabase(config);
      const transaction = db.transaction(storeNames, mode);
      
      const stores: { [storeName: string]: IDBObjectStore } = {};
      storeNames.forEach(name => {
        stores[name] = transaction.objectStore(name);
      });

      return await operation(stores);
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error;
    }
  }

  closeDatabase(databaseName: string, version: number): void {
    const cacheKey = `${databaseName}_v${version}`;
    const db = this.databases.get(cacheKey);
    if (db) {
      db.close();
      this.databases.delete(cacheKey);
    }
  }

  closeAllDatabases(): void {
    this.databases.forEach(db => db.close());
    this.databases.clear();
  }
}
