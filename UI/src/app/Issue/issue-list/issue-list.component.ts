import { Component, inject, OnInit } from '@angular/core';
import { Issue } from '../../models/issue.model';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-issue-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  apiSrv = inject(ApiService);

  ngOnInit(): void {
    this.GetAllIssues();
  }
  GetAllIssues() {
    this.apiSrv.getAllIssues().subscribe({
      next: (res) => {
        this.issues = res;
      },
      error: (err) => {
        console.error('Failed to fetch issues', err);
      }
    });
  }

  deleteIssue(){

  }
}
