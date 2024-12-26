import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Vendor } from '../model/vendor.model';

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
      vendorid: 0,
      name: '', 
      location: '', 
      rating: 4.7, 
      services: [''],
      image: '../../assets/Untitled design (3).png',
      description: ''
    }
  ];

  constructor(private router: Router, private authService: AuthService, private apiService: ApiService ) {
    this.filteredWorkshops = this.workshops;
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn;
    });
    this.fetchWorkshops(); // Fetch vendor data from the API
  }

  // Fetch vendors and map them to workshops
  fetchWorkshops() {
    this.apiService.getVendor().subscribe(
      (vendors: Vendor[]) => {
        this.workshops = vendors.map((vendor) => ({
          vendorid: vendor.vendorId,
          name: vendor.vendorName,
          location: vendor.city,
          rating: vendor.rating, // Mock rating for demo purposes
          services: ['Oil Change', 'Brake Inspection'], // Replace with actual services if available
          image: vendor.imagePath
          ? `https://api.lgm.gov.my/API_Tempah/images${vendor.imagePath.split('/images')[1]}`
          : '../../assets/background.jpg', // Default image for null paths
          description: vendor.address,
        }));
        console.log(vendors)
        this.filteredWorkshops = this.workshops; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching vendors:', error);
      }
    );
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
    console.log('Selected workshop:', workshop); 
    this.router.navigate(['/servicesdetails', workshop.vendorid]);
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
