import { AnimeInfo } from "../interfaces/Type";

export interface CollectionData extends AnimeInfo {
  createdAt: number;
}

export interface CollectionByAnimeId {
  id: number;
  keys: string[];
}
export interface IStorageItem {
  key: string;
  value: CollectionData[] | null;
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
    this.collectionKeyByAnime = "collectionByAnimeId";
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
          this.addCollectionById(key, itemParse.id);
          data.push(itemParse);
        }

        if (data) {
          const stringifyData = JSON.stringify(data);
          localStorage.setItem(formatKey, stringifyData);
        }
      }
    });
  }

  addCollectionById(key: string, id: number) {
    if (this.localStorageSupported) {
      const data = localStorage.getItem(this.collectionKeyByAnime);
      const parse: CollectionByAnimeId[] = data ? JSON.parse(data) : [];
      const findIndex = parse.findIndex(
        (item: CollectionByAnimeId) => item.id === id
      );

      if (findIndex > -1) parse[findIndex].keys.push(key);
      else {
        const input = {
          id,
          keys: [key],
        };
        parse.push(input);
      }

      const stringifyData = JSON.stringify(parse);
      localStorage.setItem(this.collectionKeyByAnime, stringifyData);
    }
  }

  // get one item by key from storage
  get(key: string) {
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

  // get one item by key from storage
  getCollectionsById(): CollectionByAnimeId[] {
    if (this.localStorageSupported) {
      const collectionById = localStorage.getItem(this.collectionKeyByAnime);
      const parseCollectionById = collectionById
        ? JSON.parse(collectionById)
        : [];
      return parseCollectionById;
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

  // remove value and key from storage
  remove(key: string) {
    const formatKey = `${this.formatKey}${key}`;
    if (this.localStorageSupported) {
      const data = localStorage.getItem(formatKey);
      const parse = data ? JSON.parse(data) : [];
      const collectionById = this.getCollectionsById();

      parse.forEach((item: CollectionData) => {
        const findIndex = collectionById.findIndex(
          (value: CollectionByAnimeId) => item.id === value.id
        );
        let keyIndex = -1;
        if (findIndex > -1)
          keyIndex = collectionById[findIndex].keys.findIndex(
            (value: string) => value === key
          );
        if (keyIndex > -1) collectionById[findIndex].keys.splice(keyIndex, 1);

        const stringifyData = JSON.stringify(collectionById);
        localStorage.setItem(this.collectionKeyByAnime, stringifyData);
      });

      localStorage.removeItem(formatKey);
    }
  }

  // remove value from storage
  removeItem(keys: string[], item: string = "") {
    if (this.localStorageSupported) {
      const parseItem = JSON.parse(item);
      keys.forEach((key) => {
        const formatKey = `${this.formatKey}${key}`;
        const data = this.get(key);
        const removeData = data.filter(
          (value: CollectionData) => value.id !== parseItem.id
        );

        const stringifyData = JSON.stringify(removeData);
        localStorage.setItem(formatKey, stringifyData);
      });
      const collectionById = this.getCollectionsById();
      const findIndex = collectionById.findIndex(
        (value: CollectionByAnimeId) => parseItem.id === value.id
      );
      if (findIndex > -1) collectionById.splice(findIndex, 1);

      const stringifyCollById = JSON.stringify(collectionById);
      localStorage.setItem(this.collectionKeyByAnime, stringifyCollById);
    }
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }
}
