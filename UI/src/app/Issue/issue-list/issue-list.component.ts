import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue.model';
import { ApiService } from '../../core/api.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-issue-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private apiSrv: ApiService, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.getAllIssues();

  }

  getAllIssues(): void {
    this.apiSrv.getAllIssues().subscribe({
      next: (res) => {
        this.issues = res;
      },
      error: (err) => {
        console.error('Failed to fetch issues', err);
      }
    });
  }

  deleteIssue(issueId: number): void {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.apiSrv.deleteIssue(issueId).subscribe({
        next: () => {
          // Remove deleted issue from the list
          this.issues = this.issues.filter(issue => issue.id !== issueId);
          alert('Issue deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete issue', err);
          alert('Error deleting issue!');
        }
      });
    }
  }
}
