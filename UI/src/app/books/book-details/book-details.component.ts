import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue.model';
import { FormsModule } from '@angular/forms';

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
  
    const issue: Partial<Issue> = {
      bookId: this.book.id,
      userId: 1,
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
