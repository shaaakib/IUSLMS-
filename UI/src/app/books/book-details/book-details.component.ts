import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getBookById(id).subscribe((data) => {
      this.book = data;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
