import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(protected localStorage: LocalStorage) { }

  save(key: string, object: any): void {
    this.localStorage.setItem(key, object).subscribe(() => {});
  }

  delete(key: string): void {
    this.localStorage.removeItem(key).subscribe(() => {});
  }

  get(key: string): Observable<any> {
    return this.localStorage.getItem(key);
  }

  clear(): void {
    this.localStorage.clear().subscribe(() => {});
  }
}
