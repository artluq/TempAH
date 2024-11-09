import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tempAH';
  menuOpen = false;
  login = false;
  role: string | null = null; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn; // Update the login status based on the observable
      if (loggedIn) {
        this.role = this.authService.getUserRole(); // Read the role when logged in
      } else {
        this.role = null; // Clear the role if not logged in
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    
    if (confirmed) {
      this.authService.logout(); // Use the AuthService to log out
      alert("Logged out successfully");
      this.router.navigate(['/']);
    }
  }
  
}
