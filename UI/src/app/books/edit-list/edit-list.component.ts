import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  imports: [FormsModule],
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.css',
})
export class EditListComponent {
  editedBook: Book = {
    id: 0,
    title: '',
    description: '',
    author: '',
    quantity: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getBookById(id).subscribe(book => {
      this.editedBook = book;
    });
  }

  updateBook() {
    console.log('Updated Book:', this.editedBook);  // Add this to check the book object
    this.apiService.Update(this.editedBook.id, this.editedBook).subscribe(
      () => {
        this.router.navigate(['/book-list']);
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/book-list']);
  }
}
