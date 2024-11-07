import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';
  newUsername = '';
  newEmail = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  onLogin() {
    // Perform login logic here
    if (this.username === 'admin' && this.password === 'password') {
      alert('Login successful');
      this.router.navigate(['/serviceslist']);
    } else {
      alert('Invalid credentials');
    }
  }

  onSignUp() {
    // Logic for signing up the user
    // You might want to validate the password match here
  }
}