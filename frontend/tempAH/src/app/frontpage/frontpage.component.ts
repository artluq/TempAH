import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent  implements OnInit {
  slides = [
    { image: 'assets/Banner1.png'},
    { image: 'assets/Banner2.png'},
    { image: 'assets/Banner3.png'},
    { image: 'assets/Banner4.png'},

  ];
  currentSlide = 0;
  login = false;
  menuOpen = false; // Tracks menu open/close state
  isLoginModalOpen = false;
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.logout(); // Use the AuthService to log out
    this.startSlideShow();
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn; // Update the login status based on the observable
    });
  }

  onScheduleClick() {
    this.router.navigate(['/signup']);
  }
  startSlideShow() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change image every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
  bookappointment(){
    this.router.navigate(['/bookappointment']);
  }

  bookAnAppointment() {
    this.router.navigate(['/bookappointment']);
  }
  toggleMenu() {
    // Toggle your menu logic
  }

  islogin() {
    // this.isLoginModalOpen = true;
    this.router.navigate(['/login']);
  }

  closeModal() {
    this.isLoginModalOpen = false;
  }

  onLogin() {
      this.login = true;
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
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.cdr.detectChanges(); // Ensure the error message is displayed
        }
      });
  }

  logout() {
    this.login = false;
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      this.authService.logout(); 
      alert("Logged out successfully");
      this.router.navigate(['/']);
    }
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