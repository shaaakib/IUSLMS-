import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../book.model';
import { ApiService } from '../../../core/api.service';
import { Issue } from '../../Issue/issue.model';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule,FormsModule, ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
  ) {}

  issueQuantity: number = 1;
  returnDate: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getBookById(id).subscribe((data) => {
      this.book = data;
    });

  }

  goBack() {
    this.router.navigate(['/']);
  }


  issueBook() {
    if (!this.book) return;

    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      alert('User not logged in.');
      return;
    }
  
    const issue: Partial<Issue> = {
      bookId: this.book.id,
      userId: userId,
      returnDate: this.returnDate,
      quantity: this.issueQuantity 
    };
  
    this.api.issueBook(issue).subscribe({
      next: (res) => {
        alert('Book issue request sent. Pending admin approval.');
        this.goBack();
      },
      error: () => alert('Failed to issue book')
    });
  }

}
