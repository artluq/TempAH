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

   constructor(private bookingService: ApiService, private router: Router, private authService: AuthService,) {}
 
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
    
    // Generate available slots
    this.generateAvailableSlots();
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
   generateAvailableSlots() {
    const startHour = 9;
    const endHour = 17;
    const interval = 30; // in minutes
    const slots: string[] = [];
  
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${this.formatTime(hour)}:00`);
      slots.push(`${this.formatTime(hour)}:30`);
    }
  
    slots.push(`${this.formatTime(endHour)}:00`);
    this.availableSlots = slots;
  
    console.log(this.availableSlots); // Check the slots here
  }
  

  formatTime(hour: number): string {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}`;
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

   openRescheduleModal(appointment: ViewBooking) {
    this.selectedAppointment = appointment; // Set the selected appointment for rescheduling
  
    // Ensure the bookingDate is a valid Date object or string and convert it accordingly
    if (this.selectedAppointment && this.selectedAppointment.bookingDate) {
      let date: Date;
  
      // Check if bookingDate is a string and convert it to Date if necessary
      if (typeof this.selectedAppointment.bookingDate === 'string') {
        date = new Date(this.selectedAppointment.bookingDate); // Convert string to Date
      } else {
        date = this.selectedAppointment.bookingDate; // Use as-is if it's already a Date object
      }
  
      // Get the date part (YYYY-MM-DD) from the Date object
      this.newDate = date.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
      this.newSlot = this.selectedAppointment.slot; // Default to current slot
    }
  
    this.showRescheduleModal = true; // Show the reschedule modal
  }
  

  closeRescheduleModal() {
    this.showRescheduleModal = false; // Hide the reschedule modal
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
 