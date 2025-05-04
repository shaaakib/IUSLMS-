import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
  };

  constructor(private apiService: ApiService, private router: Router) {}

  signUp() {
    this.apiService.CreateUser(this.user).subscribe({
      next: () => {
        alert('User created successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('⚠️ A user with this email already exists!');
        } else {
          alert('❌ Something went wrong. Please try again.');
        }
      },
    });
  }
}
