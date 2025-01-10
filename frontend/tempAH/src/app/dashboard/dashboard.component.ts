import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ViewBooking } from '../model/appointment.model';
import { Router } from '@angular/router';
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
  modalTitle: string = '';
  modalMessage: string = '';
  isModalVisible: boolean = false;

  constructor(private bookingService: ApiService, private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('fullname') || 'User'; 
    this.userid = sessionStorage.getItem('userid') || 'userid'; 

    // Fetch upcoming appointments from the API
    this.bookingService.getBookAppointment().subscribe(
      (appointments: ViewBooking[]) => {
        this.upcomingAppointments = appointments; // Update the upcoming appointments
        setInterval(() => this.checkForDailyReminders(), 60 * 60 * 1000); // Check every hour
        this.checkForDailyReminders(); // Run immediately on load
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  checkForDailyReminders() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const todayAppointments = this.upcomingAppointments.filter(appointment => {
      // Ensure that bookingDate is a Date object or is already in ISO format
      const appointmentDate = new Date(appointment.bookingDate).toISOString().split('T')[0]; // Convert bookingDate to ISO string
      console.log(appointmentDate)
      console.log(today)
      return appointmentDate === today; // Compare dates
     
    });
  
    if (todayAppointments.length > 0) {
      this.modalTitle = 'Reminder: You have appointments today!';
      this.modalMessage = `You have ${todayAppointments.length} appointment(s) today.`;
      this.isModalVisible = true;
    }
  }
  

  bookNewAppointment() {
    this.router.navigate(['/serviceslist']);
  }

  viewUpcomingAppointments() {
    // Logic to view detailed upcoming appointments
    // this.router.navigate(['/appointments']);
  }

  transformSlotTo12HourFormat(slot: string): string {
    const [hours, minutes] = slot.split(':').map(num => parseInt(num));
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);  // Optionally reset seconds to 0 if not part of the input
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(date);
  }

  closeAppointment() {
    this.selectedAppointment = null; // Close the appointment details view
  }

  viewAppointment(appointment: ViewBooking) {
    this.selectedAppointment = appointment; // Set the selected appointment
  }

  cancelBooking(bookingId: number, statusId: number) {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmed) {
        this.bookingService.updateBookingStatus(bookingId, statusId).subscribe(
            () => {
                alert(`Booking status cancelled successfully.`);
                this.upcomingAppointments = this.upcomingAppointments.filter(app => app.bookingId !== bookingId);
            },
            (error) => {
                console.error('Error updating booking status:', error);
                alert('An error occurred while updating the booking status.');
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

  closeModal() {
    this.isModalVisible = false; // Close the modal
  }
}
