import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

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
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    );
  }
}
