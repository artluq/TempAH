import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  slides = [
    { image: 'assets/slide1.png', caption: 'Efficient & Reliable Car Service', alt: 'Car Service Image' },
    { image: 'assets/slide2.jpg', caption: '24/7 Online Booking for Your Convenience', alt: 'Online Booking Image' },
    { image: 'assets/slide3.jpeg', caption: 'Client Reminders and Notifications', alt: 'Client Reminders Image' }
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
  
}