import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdminLoggedIn = false;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@admin.com' && password === '123456') {
      this.isAdminLoggedIn = true;
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
