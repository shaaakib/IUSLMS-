import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../../shared/user.model';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
 
  users: User[] = [];

  apiSrv = inject(SharedService);

  ngOnInit(): void {
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.apiSrv.GetAllUsers().subscribe((data: User[]) => {
      this.users = data;
    },
    error => {
      console.error('Error fetching Users:', error);
    }
  );
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.apiSrv.DeleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      }, error => {
        console.error('Error deleting book:', error);
      });
    }
  }
}
