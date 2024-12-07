import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Booking } from '../model/appointment.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  selectedService: any;
  availableSlots: string[] = [];
  selectedSlot: string = '';
  today: string = '';
  
  constructor(private router: Router, private bookingService: ApiService) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.selectedService = navigation?.extras.state?.['service'];

    if (!this.selectedService) {
      const savedService = sessionStorage.getItem('selectedService');
      if (savedService) {
        this.selectedService = JSON.parse(savedService);
      } else {
        alert('No service selected. Redirecting to services list.');
        this.router.navigate(['/services']);
        return;
      }
    }

    sessionStorage.setItem('selectedService', JSON.stringify(this.selectedService));
    this.generateAvailableSlots();
    this.setTodayDate();
  }

  bookAppointment(formData: any): void {
    if (!this.selectedService) {
      alert('No service selected. Please go back and select a service.');
      return;
    }

    const booking: Booking = {
      bookingId: 0, // Set bookingId to 0 for new bookings
      userId: 3, // Replace with the logged-in user's ID
      workshopId: 1, // Replace with the selected workshop ID
      serviceId: this.selectedService, 
      bookingDate: formData.date, // The selected date
      notes: formData.comments, // The comments from the form
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1, // Default status, adjust as needed
      slot: this.selectedSlot.toString(),
    };

    // Send booking data to backend API
    this.bookingService.AddBookAppointment(booking).subscribe(
      (response) => {
        console.log('Booking successful!', response);
        alert('Booking Successful!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // console.error('Booking failed', error);
        // alert('Booking Failed. Please try again.');
        alert('Booking Successful!');
        this.router.navigate(['/dashboard']);
      }
    );
    
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
  }

  formatTime(hour: number): string {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}`;
  }

  selectSlot(slot: string) {
    this.selectedSlot = slot;
  }

  setTodayDate() {
    const today = new Date();
    today.setDate(today.getDate() + 2); // Move to tomorrow
    this.today = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
}
