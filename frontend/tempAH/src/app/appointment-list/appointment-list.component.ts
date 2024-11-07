import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Appointment } from '../model/appointment.model';
import { Router } from '@angular/router';
import { AppointmentDeleteComponent } from '../appointment-delete/appointment-delete.component';
import { MatDialog } from '@angular/material/dialog'; // Make sure to import MatDialog
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  login = false;
  role: string | null = null; 
  appointment: Appointment[] = [
    { id: 1, date: '2024-11-10', time: '10:00 AM', service: 'Oil Change', location: 'Workshop A' },
    { id:2, date: '2024-11-15', time: '02:00 PM', service: 'Tire Rotation', location: 'Workshop B' },
    // Add more sample data as needed
  ];
  
  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}
  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.login = loggedIn; // Update the login status based on the observable
      if (loggedIn) {
        this.role = this.authService.getUserRole(); // Read the role when logged in
      } else {
        this.role = null; // Clear the role if not logged in
      }
    });
  }

  createAppointment() {
    this.router.navigate(['/bookappointment']); 
  }

  viewAppointment(appointment: Appointment) {
    // Pass the entire appointment object as state
    this.router.navigate(['/view-appointment', appointment.id], { state: { appointment } });
  }
  editAppointment(appointment: Appointment) {
    // Pass the entire appointment object as state to the update component
    this.router.navigate(['/edit-appointment', appointment.id], { state: { appointment } });
  }
  

  deleteAppointment(appointment: Appointment) {
    const dialogRef = this.dialog.open(AppointmentDeleteComponent, {
      data: { message: 'Are you sure you want to delete this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logic for deletion
        this.appointment = this.appointment.filter(a => a.id !== appointment.id);
      }
    });
  }

// deleteAppointment(appointment: Appointment) {
//     // Open a confirmation dialog here
//     // this.confirmationDialog.open(AppointmentDeleteComponent)
//     //   .afterClosed().subscribe(result => {
//     //     if (result) {
//     //       this.appointmentService.deleteAppointment(appointment.id).subscribe(() => {
//     //           // Refresh appointments or navigate
//     //       });
//     //     }
//     // });
// }
}