import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageFallback: { [key: string]: string } = {};
  constructor() { }

  private getStorage(): Storage | { [key: string]: string } {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage;
    }
    return this.localStorageFallback; // Dùng bộ nhớ giả nếu không có localStorage
  }

  setItem(key: string, value: string): void {
    const storage = this.getStorage();
    storage[key] = value;
  }

  getItem(key: string): string | null {
    const storage = this.getStorage();
    return storage[key] || null;
  }

  removeItem(key: string): void {
    const storage = this.getStorage();
    delete storage[key];
  }

  clear(): void {
    const storage = this.getStorage();
    if (typeof storage.clear === 'function') {
      storage.clear();
    } else {
      this.localStorageFallback = {};
    }
  }
}
