import { Component } from '@angular/core';

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
  problemDescription: string = ''; // User input for problem description
  confirmationMessage!: string;
  aiGeneratedSolution!: string; // AI-generated solution

  locations = [{ name: 'Kuala Lumpur' }, { name: 'Jalan Ampang' }];
  services = [{ name: 'Oil Change' }, { name: 'Tire Rotation' }, { name: 'Brake Inspection' }];
  workshop = [{ name: 'Workshop A' }, { name: 'Workshop B' }];

  onScheduleAppointment() {
    this.confirmationMessage = 'Your appointment has been scheduled!';
  }

  generateAISolution(problemDescription: string) {
    this.problemDescription = problemDescription;

    // Basic AI response based on the problem description
    if (problemDescription.toLowerCase().includes('engine')) {
      this.aiGeneratedSolution = 'It seems you may have an engine issue. We recommend a complete diagnostic check at Workshop A.';
    } else if (problemDescription.toLowerCase().includes('tire')) {
      this.aiGeneratedSolution = 'It sounds like a tire problem. Consider our Tire Rotation or Replacement service at Workshop B.';
    } else {
      this.aiGeneratedSolution = 'Thank you for describing the problem. Based on your description, we recommend consulting with our specialist.';
    }
  }
}