import { PaletteMode } from '@mui/material';
import { IIstance } from './interfaces/instance';
import { IUser } from './interfaces/user';

interface StorageModelTypes {
  instance: IIstance;
  user: IUser;
  authToken: string;
  i18nextLng: string;
  themeMode: PaletteMode;
}

class StorageModel {
  public setItem<K extends keyof StorageModelTypes>(key: K, value: StorageModelTypes[K]) {
    try {
      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value) as StorageModelTypes[K];
      } else if (typeof value !== 'string') {
        value = String(value) as StorageModelTypes[K];
      }

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  public getItem<K extends keyof StorageModelTypes>(key: K) {
    try {
      const item = window.localStorage.getItem(key);

      if (!item) {
        return null;
      } else if (typeof item !== 'string') {
        return JSON.parse(item) as StorageModelTypes[K];
      } else {
        return item as StorageModelTypes[K];
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public removeItem(key: keyof StorageModelTypes) {
    window.localStorage.removeItem(key);
  }
}

const Storage = new StorageModel();
export default Storage;
