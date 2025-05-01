import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar/navbar.component';
import { ApiService } from '../../../core/api.service';
import { Book } from '../../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  searchText: string = '';
  selectedAuthor: string = '';
  quantityFilter: string = '';

  categories = [
    { name: 'Science', icon: '🧪', desc: 'Physics, Chemistry, Biology' },
    { name: 'Technology', icon: '💻', desc: 'Programming, AI, Data' },
    { name: 'Literature', icon: '📖', desc: 'Novels, Poetry, Drama' },
    { name: 'Self-Help', icon: '🧠', desc: 'Habits, Productivity' },
  ];

  apiSrv = inject(ApiService);

  ngOnInit(): void {
    this.apiSrv.getAllBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
      },
      error => {
        console.error('Error fetching books:', error);
      }
    );
  }

  get uniqueAuthors(): string[] {
    return [...new Set(this.books.map(book => book.author))];
  }

  get filteredBooks(): Book[] {
    let filtered = this.books;

    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(text) ||
          book.author.toLowerCase().includes(text)
      );
    }

    if (this.selectedAuthor) {
      filtered = filtered.filter(book => book.author === this.selectedAuthor);
    }

    if (this.quantityFilter === 'low') {
      filtered = filtered.filter(book => book.quantity <= 3);
    } else if (this.quantityFilter === 'medium') {
      filtered = filtered.filter(book => book.quantity >= 4 && book.quantity <= 7);
    } else if (this.quantityFilter === 'high') {
      filtered = filtered.filter(book => book.quantity >= 8);
    }

    return filtered;
  }
}
