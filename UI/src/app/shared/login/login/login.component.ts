import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    );
  }
}
