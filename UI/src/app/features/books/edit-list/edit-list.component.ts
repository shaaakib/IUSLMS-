import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../book.model';
import { ApiService } from '../../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-list',
  imports: [FormsModule,CommonModule],
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

  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getBookById(id).subscribe((book) => {
      this.editedBook = book;
    });
  }

  // Image select korar jonno
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  updateBook() {
    const formData = new FormData();
    formData.append('Id', this.editedBook.id.toString());
    formData.append('Title', this.editedBook.title);
    formData.append('Description', this.editedBook.description);
    formData.append('Author', this.editedBook.author);
    formData.append('Quantity', this.editedBook.quantity.toString());

    if (this.selectedImage) {
      formData.append('Image', this.selectedImage);
    }

    this.apiService.updateBookWithForm(this.editedBook.id, formData).subscribe(
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
