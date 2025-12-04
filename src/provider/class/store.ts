export class Store {
  private store: Record<string, any> = {};
  private static instance: Store;

  private constructor() {
    // constructor is private
  }

  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }
  getStore() {
    return this.store;
  }

  setStore(key: string, value: any) {
    this.store[key] = value;
  }

  getValue(key: string) {
    return this.store[key];
  }
}
