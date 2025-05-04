import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../features/books/book.model';
import { User } from '../shared/user.model';
import { Issue } from '../features/Issue/issue.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7242/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/Book/GetAllBooks`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/Book/GetBookById/${id}`);
  }

  Create(book: Book) {
    return this.http.post<Book>(`${this.apiUrl}/Book/Create`, book);
  }

  Update(id: number, book: Book) {
    return this.http.put<Book>(`${this.apiUrl}/Book/Update/${id}`, book);
  }

  Delete(id: number) {
    return this.http.delete(`${this.apiUrl}/Book/Delete/${id}`);
  }

  CreateUser(user: User){
    return this.http.post<User>(`${this.apiUrl}/User/Create`, user);
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
  
  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/Issues/GetAllIssues`);
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/Issues/Create`, issue);
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Issues/Delete/${id}`)
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/Issues/GetIssueById/${id}`);
  }

  updateIssue(id: number, issue: Partial<Issue>): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/Issues/Update/${id}`, issue);
  }

  issueBook(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/Issues/Create`, issue);
  }

  approveIssue(id: number): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/Issues/Approve/${id}`, {});
  }
  
  rejectIssue(id: number): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/Issues/Reject/${id}`, {});
  }

  getMyIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/Issues/GetMyIssues`);
  }
}
