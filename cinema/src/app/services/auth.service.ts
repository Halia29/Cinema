import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

export const API_URL = "https://localhost:7267";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;
  isAuthenticated: boolean;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    @Inject(API_URL) apiUrl: string
  ) {
    this.apiUrl = apiUrl;
  }

  login(email: string, password: string): Observable<boolean> {
    const params: string = [
      `email=${email}`,
      `password=${password}`
    ].join('&');

    const url = `${this.apiUrl}/Login?${params}`;

    return this.http.get(url).pipe(
      map((response) => {
        this.setLoggedInValue(true);
        return true;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        this.setLoggedInValue(false);
        return of(false);
      })
    );
  }

  logout(): void {
    this.setLoggedInValue(false);
  }

  isLoggedIn(): boolean {
    this.isAuthenticated = this.sessionStorageService.get('isAuthenticated') === true;
    return this.isAuthenticated;
  }

  private setLoggedInValue(value: boolean): void {
    this.sessionStorageService.set('isAuthenticated', value);
    this.isAuthenticated = value;
  }
}
