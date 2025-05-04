import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Issue } from '../issue.model';
import { User } from '../../../shared/user.model';
import { Book } from '../../books/book.model';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-edit-issue',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-issue.component.html',
  styleUrl: './edit-issue.component.css',
})
export class EditIssueComponent {
  issue: Issue = {
    id: 0,
    userId: 0,
    bookId: 0,
    issueDate: '',
    returnDate: '',
    user: { id: 0, name: '' },
    book: { id: 0, title: '' },
  };

  users: User[] = [];
  books: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.getIssueById(id).subscribe((res) => {
        this.issue = res;
        console.log('Fetched issue:', this.issue);
      });
    }
    this.loadUsers();
    this.loadBooks();
  }

  loadUsers() {
    this.api.GetAllUsers().subscribe((res) => (this.users = res));
  }

  loadBooks() {
    this.api.getAllBooks().subscribe((res) => (this.books = res));
  }

  updateIssue() {
    const id = this.issue.id;
    const updateData: Partial<Issue> = {
      id: id,
      userId: this.issue.userId,
      bookId: this.issue.bookId,
      issueDate: this.issue.issueDate,
      returnDate: this.issue.returnDate,
    };

    this.api.updateIssue(id, updateData).subscribe(() => {
      alert('✅ Issue updated successfully!');
      this.router.navigate(['/issue-list']);
    });
  }

  goBack() {
    this.router.navigate(['/issue-list']);
  }
}
