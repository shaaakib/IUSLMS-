import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7242/api/Book';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/GetAllBooks`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/GetBookById/${id}`);
  }

  Create(book: Book) {
    return this.http.post<Book>(`${this.apiUrl}/Create`, book);
  }

  Update(id: number, book: Book) {
    return this.http.put<Book>(`${this.apiUrl}/Update/${id}`, book);
  }

}
