import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AiDiagnosticDialogComponent } from '../components/ai-diagnostic-dialog/ai-diagnostic-dialog.component';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  appointmentDate!: string;
  searchKeyword: string = '';
  confirmationMessage!: string;
  aiGeneratedSolution!: string;

  // Example workshop data (replace this with API data in a real implementation)
  workshops = [
    {
      id: 1,
      name: 'Workshop A',
      address: '123 Jalan Ampang, Kuala Lumpur',
      rating: 4.5,
      image: 'https://via.placeholder.com/250x150?text=Workshop+A'
    },
    {
      id: 2,
      name: 'Workshop B',
      address: '456 Jalan Bukit Bintang, Kuala Lumpur',
      rating: 4.2,
      image: 'https://via.placeholder.com/250x150?text=Workshop+B'
    },
    {
      id: 3,
      name: 'Workshop C',
      address: '789 Jalan Cheras, Kuala Lumpur',
      rating: 4.8,
      image: 'https://via.placeholder.com/250x150?text=Workshop+C'
    }
  ];

  filteredWorkshops = [...this.workshops]; // Copy of workshops for filtering

  constructor(private dialog: MatDialog) {}

  /**
   * Filters workshops based on the selected date and search keyword.
   */
  onSearch(): void {
    this.filteredWorkshops = this.workshops.filter(workshop => {
      const matchesDate = this.appointmentDate
        ? true // Optionally, filter based on date availability
        : true; // Example assumes all dates are valid
      const matchesKeyword = this.searchKeyword
        ? workshop.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          workshop.address.toLowerCase().includes(this.searchKeyword.toLowerCase())
        : true;

      return matchesDate && matchesKeyword;
    });
  }

  /**
   * Handles booking a workshop.
   * @param workshop The workshop to book.
   */
  bookWorkshop(workshop: any): void {
    // Placeholder functionality for booking a workshop
    this.confirmationMessage = `Your appointment at ${workshop.name} has been booked!`;
  }

  openAIDiagnostic() {
    const dialogRef = this.dialog.open(AiDiagnosticDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aiGeneratedSolution = result.analysis;
      }
    });
  }
}
