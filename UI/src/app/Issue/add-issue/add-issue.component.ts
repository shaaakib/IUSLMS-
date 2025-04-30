import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Issue } from '../../models/issue.model';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.css'
})
export class AddIssueComponent {
  issue: Partial<Issue> = {
    userId: 0,
    bookId: 0
  };

  users: User[] = [];
  books: Book[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadBooks();
  }

  loadUsers() {
    this.api.GetAllUsers().subscribe(res => this.users = res);
  }

  loadBooks() {
    this.api.getAllBooks().subscribe(res => this.books = res);
  }

  createIssue() {
    this.api.createIssue(this.issue).subscribe({
      next: (res) => {
        alert('✅ Issue created successfully!');
        this.router.navigate(['/issue-list']);
      },
      error: (err) => {
        console.error('❌ Failed to create issue', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/issue-list']);
  }
}
