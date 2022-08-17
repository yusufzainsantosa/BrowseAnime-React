import { AnimeInfo } from "../interfaces/Type";

export interface CollectionData extends AnimeInfo {
  createdAt: number;
}

export interface IStorageItem {
  key: string;
  value: CollectionData[] | null;
}

export interface CollectionByAnime {
  key: string;
  value: { id: number; keys: string[] }[];
}

export class StorageItem {
  key: string;
  value: CollectionData[] | null;

  constructor(data: IStorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}

// class for working with local storage in browser (common that can use other classes for store some data)
export class LocalStorageWorker {
  localStorageSupported: boolean;
  formatKey: string;
  collectionKeyByAnime: string;

  constructor() {
    this.localStorageSupported =
      typeof window["localStorage"] != "undefined" &&
      window["localStorage"] != null;
    this.formatKey = "collections|||";
    this.collectionKeyByAnime = "collectionByAnimeId"
  }

  // add value to storage
  add(keys: string[], item: string = "") {
    const currDate = new Date();
    keys.forEach((key) => {
      const formatKey = `${this.formatKey}${key}`;
      if (this.localStorageSupported && key.trim()) {
        const data = this.get(key);
        if (item) {
          const itemParse = JSON.parse(item);
          itemParse.createdAt = currDate.getTime();
          data.push(itemParse);
        }

        if (data) {
          const stringifyData = JSON.stringify(data);
          localStorage.setItem(formatKey, stringifyData);
        }
      }
    });
  }

  // get one item by key from storage
  get(key: string): any[] {
    const formatKey = `${this.formatKey}${key}`;
    if (this.localStorageSupported) {
      const item = localStorage.getItem(formatKey);
      return item
        ? JSON.parse(item).sort(
            (a: CollectionData, b: CollectionData) => a.id - b.id
          )
        : [];
    }
    return [];
  }

  // get all values and keys from storage (all items)
  getAllItems(): Array<StorageItem> {
    const list = new Array<StorageItem>();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(this.formatKey)) {
        const value = localStorage.getItem(key);

        list.push(
          new StorageItem({
            key: key.replace(this.formatKey, ""),
            value: value ? JSON.parse(value) : [],
          })
        );
      }
    }

    return list;
  }

  // get all values from storage (all items)
  getAllValues(): CollectionData[] {
    const list = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(this.formatKey)) {
        const data = localStorage.getItem(key);
        const parse = data ? JSON.parse(data) : [];
        if (parse) list.push(...parse);
      }
    }

    return list;
  }

  // remove selected storage and moved to new storage with new name
  renameKey(key: string, newKey: string) {
    if (this.localStorageSupported) {
      const temp = JSON.stringify(this.get(key));
      this.add([newKey], temp);
    }
  }

  // remove value from storage
  remove(key: string) {
    const formatKey = `${this.formatKey}${key}`;
    if (this.localStorageSupported) {
      localStorage.removeItem(formatKey);
    }
  }

  // remove value from storage
  removeItem(keys: string[], item: string = "") {
    keys.forEach((key) => {
      const formatKey = `${this.formatKey}${key}`;
      if (this.localStorageSupported) {
        const data = this.get(key);
        const parseItem = JSON.parse(item);
        const removeData = data.filter(
          (value: CollectionData) => value.id !== parseItem.id
        );

        const stringifyData = JSON.stringify(removeData);
        localStorage.setItem(formatKey, stringifyData);
      }
    });
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }
}
