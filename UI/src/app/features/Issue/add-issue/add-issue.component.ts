import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../books/book.model';
import { User } from '../../../shared/user.model';
import { ApiService } from '../../../core/api.service';
import { Issue } from '../issue.model';

@Component({
  selector: 'app-add-issue',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.css',
})
export class AddIssueComponent {
  issue: Partial<Issue> = {
    userId: 0,
    bookId: 0,
  };

  users: User[] = [];
  books: Book[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadBooks();
  }

  loadUsers() {
    this.api.GetAllUsers().subscribe((res) => (this.users = res));
  }

  loadBooks() {
    this.api.getAllBooks().subscribe((res) => (this.books = res));
  }

  createIssue() {
    this.api.createIssue(this.issue).subscribe({
      next: (res) => {
        alert('✅ Issue created successfully!');
        this.router.navigate(['/issue-list']);
      },
      error: (err) => {
        console.error('❌ Failed to create issue', err);
        const errorMessage = err.error?.message || 'create issue failed!';
        alert(errorMessage);
      },
    });
  }

  goBack() {
    this.router.navigate(['/issue-list']);
  }
}
