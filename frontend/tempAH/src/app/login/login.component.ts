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
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.access) {
          localStorage.setItem('access_token', response.access);
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        alert('Invalid credentials');
      }
    );
  }
}
