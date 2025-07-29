import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadInitialAuthState();
  }

  private loadInitialAuthState(): void {
    if (this.isBrowser) {
      const savedAuth = localStorage.getItem('isAuthenticated');
      if (savedAuth === 'true') {
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(username: string, password: string): boolean {
    // Mock login validation
    if (username && password) {
      if (this.isBrowser) {
        localStorage.setItem('isAuthenticated', 'true');
      }
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/employees']);
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('isAuthenticated');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}