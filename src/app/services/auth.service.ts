import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<string>('');

  constructor() {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedAuth === 'true' && savedUser) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(savedUser);
    }
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentUser$(): Observable<string> {
    return this.currentUserSubject.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get currentUser(): string {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): boolean {
    if (username && password) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(username);
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next('');
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }
}