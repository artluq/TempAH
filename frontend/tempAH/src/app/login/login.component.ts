import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  userRole: string | null = null; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', response.token);

        // Navigate to a different page (e.g., dashboard) upon successful login
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
