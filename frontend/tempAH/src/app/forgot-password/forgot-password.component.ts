import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: ApiService, private router: Router) {}

  onForgotPassword() {
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.successMessage = 'Password reset link sent! Check your email.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Redirect to login after 3 seconds
      },
      error: (err) => {
        this.errorMessage = 'Error: Could not send reset link.';
      }
    });
  }
}
