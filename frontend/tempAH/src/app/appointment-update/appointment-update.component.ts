import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.css']
})
export class AppointmentUpdateComponent implements OnInit {
  appointmentId: number | undefined;
  appointment: Appointment | null = null; // Use the Appointment type

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['id'];
      this.loadAppointment();
    });
  }

  loadAppointment() {
    // Get the appointment object from state
    if (history.state.appointment) {
      this.appointment = history.state.appointment;
    } else {
      console.error('No appointment data found');
      // Optionally redirect or handle the error
      this.router.navigate(['/appointments']);
    }
  }

  saveAppointment() {
    // Here, you would typically call the appointment service to update the appointment.
    // However, since we're using dummy data, just log the updated appointment.
    console.log('Updated appointment:', this.appointment);
    // After "saving," navigate back to the appointment list
    this.router.navigate(['/appointments']);
  }

  cancelEdit() {
    this.router.navigate(['/appointments']);
  }
}