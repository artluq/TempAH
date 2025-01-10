import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Booking } from '../model/appointment.model';

import { ModalComponent } from '../modal/modal.component'; // Import ModalComponent

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
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  userid: any;

  constructor(private router: Router, private bookingService: ApiService) {}

  ngOnInit(): void {
    // initialization code
    const navigation = this.router.getCurrentNavigation();
    this.selectedService = navigation?.extras.state?.['service'];
    this.userid = sessionStorage.getItem('userid') || 'userid'; 

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
    this.setTodayDate();
  }

  setTodayDate(): void {
    const today = new Date();
    today.setDate(today.getDate() + 2); // Move to tomorrow
    this.today = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  onDateChange(event: Event): void {
    const selectedDateString = (event.target as HTMLInputElement).value;
    const selectedDate = new Date(selectedDateString);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const vendorId = this.selectedService.vendorId;
    this.fetchAvailableSlots(vendorId, formattedDate);
  }

  fetchAvailableSlots(vendorId: number, formattedDate: string): void {
    this.bookingService.getAvailableSlot(vendorId, formattedDate).subscribe(
      (slots) => {
        this.availableSlots = slots;
      },
      (error) => {
        console.error('Error fetching available slots:', error);
        this.availableSlots = [];
        alert('Failed to load available slots. Please try again.');
      }
    );
  }

  selectSlot(slot: string): void {
    this.selectedSlot = slot;
  }

  bookAppointment(formData: any): void {
    if (!this.selectedService) {
      alert('No service selected. Please go back and select a service.');
      return;
    }

    const booking: Booking = {
      bookingId: 0, 
      userId: this.userid, 
      workshopId: this.selectedService.vendorId, 
      serviceId: this.selectedService.serviceDetailId,
      bookingDate: formData.date,
      notes: formData.comments,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1,
      status: '',
      slot: this.selectedSlot.toString(),
    };

    this.bookingService.AddBookAppointment(booking).subscribe(
      (response) => {
        // Set modal visibility to true and show success message
        this.modalTitle = 'Booking Successful';
        this.modalMessage = 'Your booking has been confirmed. Please make the payment at the counter once the service is completed.';
        this.isModalVisible = true;
      },
      (error) => {
        console.error('Booking failed', error);
        alert('Booking Failed. Please try again.');
      }
    );
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // Handle the close modal event and navigate to dashboard
  handleModalClose(): void {
    this.isModalVisible = false;
    this.navigateToDashboard(); // Navigate to dashboard after modal closes
  }
}
