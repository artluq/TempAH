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
  selectedAppointment: ViewBooking | null = null;

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

 
  transformSlotTo12HourFormat(slot: string): string {
    // Split the slot into hours and minutes
    const [hours, minutes] = slot.split(':').map(num => parseInt(num));
    
    // Create a new Date object and set the hours and minutes
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);  // Optionally reset seconds to 0 if not part of the input
    
    // Return the formatted time using Angular's DatePipe
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(date);
  }
  closeAppointment() {
    this.selectedAppointment = null; // Close the appointment details view
  }

  viewAppointment(appointment: ViewBooking) {
    this.selectedAppointment = appointment; // Set the selected appointment
  }
  
  cancelBooking(bookingId: number) {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmed) {
      this.bookingService.updateBookingCancelled(bookingId).subscribe(
        () => {
          alert('Booking cancelled successfully');
          // Optionally, you can remove the cancelled appointment from the UI
          this.upcomingAppointments = this.upcomingAppointments.filter(app => app.bookingId !== bookingId);
        },
        (error) => {
          console.error('Error cancelling booking:', error);
          alert('An error occurred while canceling the booking.');
        }
      );
    }
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
