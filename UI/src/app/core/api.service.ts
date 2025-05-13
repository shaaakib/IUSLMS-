import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../features/books/book.model';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7242/api';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/Book/GetAllBooks`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/Book/GetBookById/${id}`);
  }

  Create(formData: FormData) {
    return this.http.post<Book>(`${this.apiUrl}/Book/Create`, formData);
  }

  updateBookWithForm(id: number, bookData: FormData) {
    return this.http.put(`${this.apiUrl}/Book/Update/${id}`, bookData);
  }

  Delete(id: number) {
    return this.http.delete(`${this.apiUrl}/Book/Delete/${id}`);
  }
}
