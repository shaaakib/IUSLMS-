import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  otp = '';
  phone = '';

  constructor(
    private route: ActivatedRoute,
    private api: SharedService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'];
    });
  }

  verifyOtp() {
    this.api.verifyOtp(this.phone, this.otp).subscribe({
      next: () => {
        alert('✅ Phone verified successfully!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('❌ Invalid OTP!');
      }
    });
  }
}
