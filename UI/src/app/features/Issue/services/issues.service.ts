import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private apiUrl = 'https://localhost:7242/api';

  constructor(private http: HttpClient) {}

  getAllIssues(): Observable<Issue[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get<Issue[]>(`${this.apiUrl}/Issues/GetAllIssues`, {
      headers,
    });
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/Issues/Create`, issue);
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Issues/Delete/${id}`);
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
