import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Clear authentication data when the login page is loaded
    sessionStorage.clear();
    localStorage.clear();
    (this.authService as any).loggedIn.next(false); // Notify logout state if needed
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Store the token and role in localStorage
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('role', response.role.toString());

        // Notify AuthService about the login state
        // this.authService.loggedIn$.next(true);
        (this.authService as any).loggedIn.next(true);

        // Redirect based on the role
        this.redirectBasedOnRole(response.role);

        // Manually trigger change detection
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.cdr.detectChanges(); // Ensure the error message is displayed
      }
    });
  }

  redirectBasedOnRole(role: number) {
    if (role === 1) {
      this.router.navigate(['/dashboard-admin']);
    } else if (role === 2) {
      this.router.navigate(['/dashboard-vendor']);
    } else if (role === 3) {
      this.router.navigate(['/dashboard']);
    }
  }
}
