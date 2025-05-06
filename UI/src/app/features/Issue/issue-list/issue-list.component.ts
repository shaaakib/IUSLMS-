import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/authentication/auth.service';
import { Issue } from '../issue.model';
import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-issue-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(
    private apiSrv: IssuesService,
    public auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

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
      },
    });
  }
  

  deleteIssue(issueId: number): void {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.apiSrv.deleteIssue(issueId).subscribe({
        next: () => {
          // Remove deleted issue from the list
          this.issues = this.issues.filter((issue) => issue.id !== issueId);
          alert('Issue deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete issue', err);
          alert('Error deleting issue!');
        },
      });
    }
  }

  approve(id: number) {
    this.apiSrv.approveIssue(id).subscribe({
      next: (updatedIssue) => {
        alert(`✅ Issue approved successfully! Status: ${updatedIssue.status}`);
        this.getAllIssues(); // Refresh the list with the updated data
      },
      error: (err) => {
        console.error('Failed to approve issue', err);
        alert('❌ Error approving issue!');
      }
    });
  }
  
  reject(id: number) {
    this.apiSrv.rejectIssue(id).subscribe({
      next: (updatedIssue) => {
        alert(`✅ Issue rejected successfully! Status: ${updatedIssue.status}`);
        this.getAllIssues(); // Refresh the list with the updated data
      },
      error: (err) => {
        console.error('Failed to reject issue', err);
        alert('❌ Error rejecting issue!');
      }
    });
  }
}
