import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  role: number | null = null;
  fullname: string | null = null; 
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn;
      if (loggedIn) {
        this.role = this.authService.getUserRole();
        this.fullname = this.authService.getFullname();
  
        // Trigger change detection
        this.cdr.detectChanges();
      } else {
        this.role = null;
        this.fullname = null;
      }
    });
  
    // Navigate to the correct route based on role
    const role = parseInt(localStorage.getItem('role') || '', 10);
    if (role === 1) {
      this.router.navigate(['/dashboard-admin']);
    } else if (role === 2) {
      this.router.navigate(['/dashboard-vendor']);
    } else if (role === 3) {
      this.router.navigate(['/dashboard']);
    }
  }
  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      this.authService.logout();  // Use the AuthService to log out
      alert("Logged out successfully");
      this.router.navigate(['/']);
    }
  }
}
