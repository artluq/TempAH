import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})

export class ServiceListComponent  implements OnInit {
  login = false;
  searchQuery = { location: '', serviceType: '' };
  searchPerformed = false;
  filteredWorkshops: any[] = [];
  selectedWorkshop: any = null;
  appointment = { date: '', time: '' };
  
  // Updated workshops with Malaysian companies
  workshops = [
    { 
      name: 'Autohaus KL', 
      location: 'Kuala Lumpur', 
      rating: 4.7, 
      services: ['Oil Change', 'Brake Inspection', 'Tire Rotation', 'Battery Check'] 
    },
    { 
      name: 'MEC Auto Garage', 
      location: 'Petaling Jaya', 
      rating: 4.5, 
      services: ['Air Conditioning Service', 'Engine Diagnostics', 'Tire Rotation', 'Alignment'] 
    },
    { 
      name: 'Garage 51', 
      location: 'Shah Alam', 
      rating: 4.3, 
      services: ['Oil Change', 'Brake Inspection', 'Transmission Service'] 
    },
    { 
      name: 'Xpert Car Care', 
      location: 'Johor Bahru', 
      rating: 4.4, 
      services: ['Battery Check', 'Engine Overhaul', 'Suspension Repair', 'Alignment'] 
    },
    { 
      name: 'QuickFix Workshop', 
      location: 'Penang', 
      rating: 4.6, 
      services: ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Air Conditioning Service'] 
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
    if(this.login == true){
      this.router.navigate(['/bookappointment']); 
    }
    else{
      this.router.navigate(['/login']); 
    }
  }

  resetBooking() {
    this.appointment = { date: '', time: '' };
    this.selectedWorkshop = null;
  }
}