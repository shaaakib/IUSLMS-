import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7242/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/User/Login`, loginData);
  }

  saveLoginData(response: any) {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('role', response.role);
    localStorage.setItem('userId', response.user.id);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

}
