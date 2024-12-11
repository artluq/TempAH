import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ViewBooking } from '../model/appointment.model';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = ''; 
  userid = '';
  upcomingAppointments: ViewBooking[] = []; // Updated to store ViewBooking objects
  

  constructor(private bookingService: ApiService, private router: Router, private authService: AuthService,) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('fullname') || 'User'; 
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

  logout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      this.authService.logout();  // Use the AuthService to log out
      alert("Logged out successfully");
      this.router.navigate(['/']);
    }
  }

  viewAppointment(id: number) {
    // Logic to view appointment details
    console.log('Viewing appointment', id);
    this.router.navigate(['/appointment', id]); // Example route
  }
  
  cancelAppointment(id: number) {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmed) {
      // this.bookingService.cancelAppointment(id).subscribe(
      //   () => {
      //     alert('Appointment canceled successfully');
      //     this.upcomingAppointments = this.upcomingAppointments.filter(app => app.id !== id);
      //   },
      //   (error) => {
      //     console.error('Error canceling appointment:', error);
      //   }
      // );
    }
  }
  
}
