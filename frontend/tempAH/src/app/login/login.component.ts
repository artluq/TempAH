import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  userRole: string | null = null; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    // Example credentials for demonstration purposes
    const validCredentials = {
      user: { username: 'user', password: 'password', role: 'user' },
      admin: { username: 'admin', password: 'adminpass', role: 'admin' },
      vendor: { username: 'vendor', password: 'vendorpass', role: 'vendor' }
    };

    if ((this.username === validCredentials.user.username && this.password === validCredentials.user.password) || 
        (this.username === validCredentials.admin.username && this.password === validCredentials.admin.password) ||
        (this.username === validCredentials.vendor.username && this.password === validCredentials.vendor.password)) {
      alert('Login successful');
      this.authService.login(this.username);
      this.userRole = this.authService.getUserRole(); // Get the role from AuthService

      // Navigate based on the role
      if (this.userRole === 'admin') {
        this.router.navigate(['/dashboard-admin']); 
      } else if (this.userRole === 'vendor') {
        this.router.navigate(['/dashboard-vendor']); 
      } else{
        this.router.navigate(['/dashboard']); 
      }
    } else {
      alert('Invalid credentials');
    }
  }
}
