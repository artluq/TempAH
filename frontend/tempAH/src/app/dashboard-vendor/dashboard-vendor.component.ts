import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ViewBooking } from '../model/appointment.model';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard-vendor',
  templateUrl: './dashboard-vendor.component.html',
  styleUrls: ['./dashboard-vendor.component.css']
})
export class DashboardVendorComponent implements OnInit {
  username = ''; 
  userid = '';
  upcomingAppointments: ViewBooking[] = []; // Updated to store ViewBooking objects
  selectedAppointment: ViewBooking | null = null;
  newDate: string = '';
  newSlot: string = '';
  showRescheduleModal: boolean = false;
  availableSlots: string[] = [];
  selectedSlot: string = '';
  today: string = '';

  constructor(private bookingService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('fullname') || 'User'; 
    this.userid = sessionStorage.getItem('userid') || 'userid'; 

    // Fetch upcoming appointments from the API
    this.bookingService.getBookAppointmentbyVendor().subscribe(
      (appointments: ViewBooking[]) => {
        this.upcomingAppointments = appointments; // Update the upcoming appointments
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );

    // Set today's date for booking
    this.setTodayDate();
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
    this.showRescheduleModal = false; 
  }

  viewAppointment(appointment: ViewBooking) {
    this.selectedAppointment = appointment; // Set the selected appointment
  }

  selectSlot(slot: string) {
    this.selectedSlot = slot;
    console.log(this.selectedSlot);  // Check if the slot is being selected
  }

  setTodayDate() {
    const today = new Date();
    today.setDate(today.getDate() + 2); // Move to tomorrow
    this.today = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  fetchAvailableSlots() {
    if (!this.selectedAppointment || !this.newDate) return;

    const vendorId = Number(this.userid); // Assuming `userid` is the vendor's ID
    const selectedDate = this.newDate;

    this.bookingService.getAvailableSlot(vendorId, selectedDate).subscribe(
      (slots: string[]) => {
        this.availableSlots = slots;
        console.log('Available slots:', this.availableSlots, vendorId);
      },
      (error) => {
        console.error('Error fetching available slots:', error);
      }
    );
  }

  openRescheduleModal(appointment: ViewBooking) {
    this.selectedAppointment = appointment;

    if (this.selectedAppointment && this.selectedAppointment.bookingDate) {
      const date = new Date(this.selectedAppointment.bookingDate);
      this.newDate = date.toISOString().split('T')[0];
      this.newSlot = this.selectedAppointment.slot;

      this.fetchAvailableSlots(); // Fetch available slots for the selected date
    }

    this.showRescheduleModal = true;
  }

  closeRescheduleModal() {
    this.showRescheduleModal = false;
    this.availableSlots = []; // Clear available slots when modal is closed
  }

  confirmAppointment(appointment: ViewBooking): void {
    if (appointment.expr1 === 'Confirmed') {
      alert('This appointment is already confirmed.');
      return;
    }

    const confirmAction = window.confirm('Are you sure you want to confirm this appointment?');
    if (confirmAction) {
      // Update status in the UI immediately
      appointment.expr1 = 'Confirmed';

      // Call the API to persist the change
      this.bookingService.updateBookingStatus(appointment.bookingId, 2).subscribe(
        (response) => {
          alert('Appointment successfully confirmed!');
          console.log('Status updated successfully:', response);
        },
        (error) => {
          console.error('Error updating status:', error);
          alert('Failed to update status. Please try again.');
          // Revert status change in case of an error
          appointment.expr1 = 'Pending';
        }
      );
    }
  }

  rescheduleAppointment() {
    // Ensure the selected appointment and new date/slot are valid
    if (this.selectedAppointment && this.newDate && this.newSlot) {
      const updatedAppointment = { 
        ...this.selectedAppointment, 
        bookingDate: `${this.newDate}T${this.newSlot}:00`, // Format the new booking date and time
        slot: this.newSlot
      };

      // Call the API to update the appointment
      // this.bookingService.updateBooking(updatedAppointment).subscribe(
      //   () => {
      //     alert('Appointment rescheduled successfully');
      //     this.upcomingAppointments = this.upcomingAppointments.map(app => 
      //       app.bookingId === this.selectedAppointment?.bookingId ? updatedAppointment : app
      //     );
      //     this.closeRescheduleModal(); // Close the modal after rescheduling
      //   },
      //   (error) => {
      //     console.error('Error rescheduling booking:', error);
      //     alert('An error occurred while rescheduling the booking.');
      //   }
      // );
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
