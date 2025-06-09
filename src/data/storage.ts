import { IIstance } from './interfaces/instance';

interface StorageModelTypes {
  instance: IIstance;
}

class StorageModel {
  public setItem<K extends keyof StorageModelTypes>(key: K, value: StorageModelTypes[K]) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  public getItem<K extends keyof StorageModelTypes>(key: K) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as StorageModelTypes[K]) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public removeItem(key: keyof StorageModelTypes) {
    window.localStorage.removeItem(key);
  }
}

export const Storage = new StorageModel();
