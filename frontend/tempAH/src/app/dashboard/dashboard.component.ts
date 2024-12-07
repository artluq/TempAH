import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ViewBooking } from '../model/appointment.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = ''; 
  userid = '';
  upcomingAppointments: ViewBooking[] = []; // Updated to store ViewBooking objects
  

  constructor(private bookingService: ApiService, private router: Router) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || 'User'; 
    this.userid = sessionStorage.getItem('userid') || 'userid'; 

    // Fetch upcoming appointments from the API
    this.bookingService.getBookAppointment().subscribe(
      (appointments: ViewBooking[]) => {
        this.upcomingAppointments = appointments; // Update the upcoming appointments
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  bookNewAppointment() {
    // Logic to navigate to the booking page
    this.router.navigate(['/serviceslist']);
  }

  viewUpcomingAppointments() {
    // Logic to view detailed upcoming appointments
    // this.router.navigate(['/appointments']);
  }
}
