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
  newBook = {
    title: '',
    description: '',
    author: '',
    quantity: 0
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  goBack() {
    this.router.navigate(['/book-list']);
  }

  // File select korle preview & File object save
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Book create API call with FormData
  addBook() {
    const formData = new FormData();
    formData.append('Title', this.newBook.title);
    formData.append('Description', this.newBook.description);
    formData.append('Author', this.newBook.author);
    formData.append('Quantity', this.newBook.quantity.toString());

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    this.apiService.Create(formData).subscribe(
      (response: any) => {
        console.log('Book added successfully:', response);
        this.router.navigate(['/book-list']);
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}
