import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, DecodedJwt } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  readonly currentUser = signal<DecodedJwt | null>(this.loadUser());

  login(payload: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload);
  }

  register(payload: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload);
  }

  saveSession(res: AuthResponse) {
    if (!isPlatformBrowser(this.platformId)) return;
    const decoded = this.decodeToken(res.token);
    const user: DecodedJwt = { email: res.email, role: res.role.toUpperCase(), exp: decoded['exp'] as number | undefined };
    localStorage.setItem('auth_token', res.token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    const user = this.currentUser();
    return user !== null && (user.exp === undefined || user.exp * 1000 > Date.now());
  }

  private loadUser(): DecodedJwt | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    const user: DecodedJwt = JSON.parse(raw);
    if (user.exp !== undefined && user.exp * 1000 < Date.now()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      return null;
    }
    return user;
  }

  private decodeToken(token: string): Record<string, unknown> {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  }
}
