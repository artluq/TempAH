import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Appointment, ViewBooking } from '../model/appointment.model';
import { Router } from '@angular/router';
import { AppointmentDeleteComponent } from '../appointment-delete/appointment-delete.component';
import { MatDialog } from '@angular/material/dialog'; 
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  login = false;
  role: number | null = null; 
  appointment: ViewBooking[] = [];
  selectedAppointment: ViewBooking | null = null;  // Variable to hold the selected appointment

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn; // Update the login status based on the observable
      if (loggedIn) {
        this.role = this.authService.getUserRole(); // Read the role when logged in
      } else {
        this.role = null; // Clear the role if not logged in
      }
    });

    // Fetch upcoming appointments from the API
    this.apiService.getHistoryAppointment().subscribe(
      (appointments: ViewBooking[]) => {
        this.appointment = appointments; // Update the upcoming appointments
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  createAppointment() {
    this.router.navigate(['/serviceslist']); 
  }

  viewAppointment(appointment: ViewBooking) {
    // Set the selected appointment
    this.selectedAppointment = appointment;
  }

  closeAppointmentDetails() {
    // Reset selected appointment to null to hide the details
    this.selectedAppointment = null;
  }
}
