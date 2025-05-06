import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl = 'https://localhost:7242/api';

  constructor(private http: HttpClient) {}

  SignUp(user: User) {
    return this.http.post<User>(`${this.apiUrl}/User/SignUp`, user);
  }

  GetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/User/GetAllUsers`);
  }

  DeleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/User/Delete/${id}`);
  }

  GetUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/User/GetUserById/${id}`);
  }

  UpdateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/User/Update/${id}`, user);
  }

  verifyOtp(phone: string, otp: string){
    return this.http.post<User>(`${this.apiUrl}/User/VerifyOtp`, {
      phoneNumber: phone,
      otp: otp
    });
  }
}
