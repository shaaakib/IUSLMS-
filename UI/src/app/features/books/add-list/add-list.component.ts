import { Router } from "@angular/router";
import { ApiService } from "../../../core/api.service";
import { Book } from "../book.model";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";


@Component({
  selector: 'app-add-list',
  imports: [FormsModule],
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.css',
})
export class AddListComponent {
  newBook: Book = {
    id: 0,
    title: '',
    description: '',
    author: '',
    quantity: 0,
  };

  constructor(private apiService: ApiService, private router: Router) {}

  goBack() {
    this.router.navigate(['/book-list']);
  }

  addBook() {
    this.apiService.Create(this.newBook).subscribe(
      (response: Book) => {
        console.log('Book added successfully:', response);
        this.router.navigate(['/book-list']); // Navigate to the book list after adding
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}
