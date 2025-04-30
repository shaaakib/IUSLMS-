import { Component, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { ApiService } from '../../core/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  
  books: Book[] = [];

  apiSrv = inject(ApiService);

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.apiSrv.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
    },
    error => {
      console.error('Error fetching books:', error);
    }
  );
  }

}
