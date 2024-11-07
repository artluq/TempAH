import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Adjust the import path as needed

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login = false;
  menuOpen = false; // Tracks menu open/close state

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn; // Update the login status based on the observable
    });
  }
  bookappointment(){
    this.router.navigate(['/bookappointment']);
  }

  logout() {
    this.authService.logout(); // Use the AuthService to log out
    alert('Logged out successfully');
    this.router.navigate(['/login']);
  }

  islogin() {
    this.router.navigate(['/login']);
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
