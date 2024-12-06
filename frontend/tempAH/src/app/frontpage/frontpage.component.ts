import { Component, OnInit } from '@angular/core';
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
    { image: 'assets/Banner3.png'}
  ];
  currentSlide = 0;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout(); // Use the AuthService to log out
    this.startSlideShow();
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

  logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      this.authService.logout();  // Use the AuthService to log out
      alert("Logged out successfully");
      this.router.navigate(['/']);
    }
  }

  bookAnAppointment() {
    this.router.navigate(['/bookappointment']);
  }

}