import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ViewBooking } from '../model/appointment.model';

@Component({
  selector: 'app-dashboard-vendor',
  templateUrl: './dashboard-vendor.component.html',
  styleUrls: ['./dashboard-vendor.component.css']
})
export class DashboardVendorComponent implements OnInit {
 
  upcomingAppointments: ViewBooking[] = []; // Store the fetched appointments

  constructor(private bookingService: ApiService) {}

  ngOnInit(): void {
    // Fetch appointments for the vendor when the component is initialized
    this.bookingService.getBookAppointmentbyVendor().subscribe(
      (appointments: ViewBooking[]) => {
        this.upcomingAppointments = appointments; // Update the upcoming appointments
      },
      (error) => {
        console.error('Error fetching appointments:', error); // Handle error
      }
    );
  }
}
