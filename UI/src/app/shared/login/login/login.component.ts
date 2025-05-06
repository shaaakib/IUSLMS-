import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.saveLoginData(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        const errorMessage = error.error?.message || 'Login failed';
        alert(errorMessage);
      }
    );
  }
}
