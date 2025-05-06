import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../user.model';
import { SharedService } from '../../services/shared.service';

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
    phoneNumber: '',
    otp: '' 
  };

  constructor(private apiService: SharedService, private router: Router) {}

  signUp() {
    this.apiService.SignUp(this.user).subscribe({
      next: () => {
        alert('OTP sent! Please check console.');
        this.router.navigate(['/verify-otp'], {
          queryParams: { phone: this.user.phoneNumber }
        });
      },
      error: (err) => {
        if (err.status === 409) {
          alert('⚠️ A user with this email already exists!');
        } else {
          alert('❌ Something went wrong. Please try again.');
        }
      }
    });
  }
}
