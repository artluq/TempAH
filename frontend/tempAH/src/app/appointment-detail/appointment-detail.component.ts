import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../model/appointment.model'; // Update the path as necessary
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  appointmentId: number | undefined;
  appointment: Appointment | null = null; // Use the Appointment type
  login = false;
  role: string | null = null; 

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['id'];
      this.loadAppointment();
    });

    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn; // Update the login status based on the observable
      if (loggedIn) {
        this.role = this.authService.getUserRole(); // Read the role when logged in
      } else {
        this.role = null; // Clear the role if not logged in
      }
    });
  }

  loadAppointment() {
    // Get the appointment object from state
    if (history.state.appointment) {
      this.appointment = history.state.appointment;
    } else {
      // Handle case where no appointment is found, e.g., redirect or show an error
      console.error('No appointment data found');
    }
  }
}
