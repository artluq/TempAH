import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ViewBooking } from '../model/appointment.model';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  remindedAppointments = new Set<string>();

  constructor(private bookingService: ApiService, private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('fullname') || 'User'; 
    this.userid = sessionStorage.getItem('userid') || 'userid'; 

    // Fetch upcoming appointments from the API
    this.bookingService.getBookAppointment().subscribe(
      (appointments: ViewBooking[]) => {
        this.upcomingAppointments = appointments; // Update the upcoming appointments
        setInterval(() => this.checkForDailyReminders(), 60 * 60 * 1000);
        this.checkForDailyReminders(); // Run immediately on load
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
    
  }
  checkForDailyReminders(): void {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

    // Check if today's reminder has already been sent
    if (!this.remindedAppointments.has(today)) {
      const todaysAppointments = this.upcomingAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.bookingDate).toISOString().split('T')[0];
        console.log(appointmentDate)
        return appointmentDate === today;
        
      });

      if (todaysAppointments.length > 0) {
        this.showDailyReminder(todaysAppointments); // Show a single reminder for all appointments today
        this.remindedAppointments.add(today); // Mark today's date as reminded
      }
    }
  }

  showDailyReminder(appointments: any[]): void {
    const summary = appointments
      .map((appointment) => `• ${appointment.serviceTitle} at ${appointment.slot}`)
      .join('\n'); // Create a bulleted list of appointments

    this.toastr.info(
      `You have the following appointments today:\n${summary}`,
      'Daily Appointment Reminder',
      { timeOut: 10000, closeButton: true, enableHtml: true } // Customize Toastr options
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
