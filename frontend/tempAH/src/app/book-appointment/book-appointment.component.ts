import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AiDiagnosticDialogComponent } from '../components/ai-diagnostic-dialog/ai-diagnostic-dialog.component';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  selectedLocation!: string;
  selectedWorkshop!: string;
  selectedService!: string;
  appointmentDate!: string;
  appointmentTime!: string;
  confirmationMessage!: string;
  aiGeneratedSolution!: string;

  locations = [{ name: 'Kuala Lumpur' }, { name: 'Jalan Ampang' }];
  workshop = [{ name: 'Workshop A' }, { name: 'Workshop B' }];
  services = [
    { name: 'Oil Change' },
    { name: 'Brake Service' },
    { name: 'Tire Rotation' },
    { name: 'Engine Tune-up' }
  ];

  constructor(private dialog: MatDialog) {}

  onScheduleAppointment() {
    if (!this.aiGeneratedSolution) {
      alert('Please complete the AI Car Diagnostic first');
      return;
    }
    this.confirmationMessage = 'Your appointment has been scheduled!';
  }

  openAIDiagnostic() {
    // const dialogRef = this.dialog.open(AiDiagnosticDialogComponent, {
    //   width: '600px',
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.aiGeneratedSolution = result.analysis;
    //   }
    // });
  }
}