import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})

export class ServiceListComponent implements OnInit {
  login = false;
  searchQuery = { location: '', serviceType: '' };
  searchPerformed = false;
  filteredWorkshops: any[] = [];
  selectedWorkshop: any = null;
  appointment = { date: '', time: '' };

  // Updated workshops with images and descriptions
  workshops = [
    { 
      name: 'Autohaus KL', 
      location: 'Kuala Lumpur', 
      rating: 4.7, 
      services: ['Oil Change', 'Brake Inspection', 'Tire Rotation', 'Battery Check'],
      image: '../../assets/Untitled design (3).png',
      description: 'Specialist in European car servicing and diagnostics with over 15 years of experience.'
    },
    { 
      name: 'MEC Auto Garage', 
      location: 'Petaling Jaya', 
      rating: 4.5, 
      services: ['Air Conditioning Service', 'Engine Diagnostics', 'Tire Rotation', 'Alignment'],
      image: '../../assets/Aesthetic Luxury.jpeg',
      description: 'Expert in air conditioning and engine diagnostics with a focus on quick and reliable service.'
    },
    { 
      name: 'Garage 51', 
      location: 'Shah Alam', 
      rating: 4.5, 
      services: ['Oil Change', 'Brake Inspection', 'Transmission Service'],
      image: '../../assets/slide3.jpeg',
      description: 'Specializing in transmission services and brake inspections with a customer satisfaction focus.'
    },
    { 
      name: 'Xpert Car Care', 
      location: 'Johor Bahru', 
      rating: 4.4, 
      services: ['Battery Check', 'Engine Overhaul', 'Suspension Repair', 'Alignment'],
      image: '../../assets/slide2.jpg',
      description: 'Known for engine overhauls and battery checks, offering top-notch service in Johor Bahru.'
    },
    { 
      name: 'QuickFix Workshop', 
      location: 'Penang', 
      rating: 4.6, 
      services: ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Air Conditioning Service'],
      image: '../../assets/slide1.png',
      description: 'Fast and reliable service, specializing in oil changes and tire rotations in Penang.'
    }
  ];

  constructor(private router: Router, private authService: AuthService) {
    this.filteredWorkshops = this.workshops;
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn;
    });
  }

  searchWorkshops() {
    this.searchPerformed = true;
    this.filteredWorkshops = this.workshops.filter(workshop => {
      return (
        (!this.searchQuery.location || workshop.location.toLowerCase().includes(this.searchQuery.location.toLowerCase())) &&
        (!this.searchQuery.serviceType || workshop.services.includes(this.searchQuery.serviceType))
      );
    });
  }

  selectWorkshop(workshop: any) {
    // if (this.login == true) {
    //   this.router.navigate(['/servicesdetails']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
    this.router.navigate(['/servicesdetails']);
  }

  resetBooking() {
    this.appointment = { date: '', time: '' };
    this.selectedWorkshop = null;
  }
    // Function to get the number of stars based on the rating
    getStars(rating: number): boolean[] {
      const fullStars = Math.floor(rating);
      const halfStars = rating % 1 !== 0 ? 1 : 0;
      const emptyStars = 5 - (fullStars + halfStars);
  
      // Return an array of true (full star), false (empty star), or half (half star)
      return [
        ...Array(fullStars).fill(true),
        ...Array(halfStars).fill(false),
        ...Array(emptyStars).fill(false)
      ];
    }
}
