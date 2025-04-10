import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService, // Sử dụng LocalStorageService
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:9191/identity/api/v1/auth/sign-in', { email, password });
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem('refreshToken');
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setItem('accessToken', accessToken);
    this.localStorageService.setItem('refreshToken', refreshToken);
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  logout(): void {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  checkLoginStatus(): void {
    const token = this.localStorageService.getItem('accessToken');
    this.isLoggedInSubject.next(!!token);
  }
}
