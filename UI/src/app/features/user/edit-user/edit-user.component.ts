import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/user.model';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: number;
  user: User = {
    id: 0,
    name: '',
    email: '',
    role: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: SharedService,
    private router: Router
  ) {}

  goBack() {
    this.router.navigate(['/user-list']);
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUser();
  }

  getUser() {
    this.apiService.GetUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    this.apiService.UpdateUser(this.userId, this.user).subscribe(() => {
      alert('User updated successfully!');
      this.router.navigate(['/user-list']);
    });
  }
}
