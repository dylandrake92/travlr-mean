import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private KEY = 'travlr.token';

  get token(): string | null { return localStorage.getItem(this.KEY); }
  isLoggedIn(): boolean { return !!this.token; }

  login(token: string): void { localStorage.setItem(this.KEY, token); }
  logout(): void { localStorage.removeItem(this.KEY); }
}