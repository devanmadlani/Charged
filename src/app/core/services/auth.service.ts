import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, UserRole } from '@models/user.model';
import Session from 'supertokens-web-js/recipe/session';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();
  readonly userRole = computed(() => this._user()?.role ?? null);

  private router = inject(Router);
  private http = inject(HttpClient);

  async loadUserFromSession(): Promise<User | null> {
    const sessionExists = await Session.doesSessionExist();
    if (!sessionExists) return null;

    const mockUser: User = {
      role: 'user',
      username: 'devan',
    };

    return Promise.resolve(mockUser);

    try {
      const user = await firstValueFrom(
        this.http.get<User>(
          'https://charged-app.onrender.com/user/sessioninfo',
          {
            withCredentials: true,
          }
        )
      );
      return user;
    } catch (err) {
      console.error('Error loading session user:', err);
      return null;
    }
  }
  setUser(user: User | null): void {
    this._user.set(user);
  }

  logout(): void {
    this._user.set(null);
    this.router.navigateByUrl('/login');
  }

  hasRole(allowedRoles: UserRole[]): boolean {
    const role = this.userRole();
    return !!role && allowedRoles.includes(role);
  }
}
