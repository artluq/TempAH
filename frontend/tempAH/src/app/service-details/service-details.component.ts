import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ServiceDetail } from '../model/services.model';
import { AiDiagnosticDialogComponent } from '../components/ai-diagnostic-dialog/ai-diagnostic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
  services: ServiceDetail[] = [];
  selectedService: any = null;
  aiGeneratedSolution!: string;

  constructor(private Service: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getServices();
  }

  // Fetching the list of services from the API or service
  getServices(): void {
    this.Service.getServiceDetails().subscribe(
      (response: any) => {
        this.services = response;
        // this.formatDetails();
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  // formatDetails() {
  //   this.services = this.services.map(service => {
  //     if (service.details && typeof service.details === 'string') {
  //       service.details = service.details.split(';'); // Convert semicolon-separated string to array
  //     }
  //     return service;
  //   });
  // }
  // Handle selecting a service
  selectService(service: any): void {
    this.selectedService = service;
    console.log('Service selected:', service);
    // You can now proceed to book the appointment for the selected service
    // or navigate to another page for further steps.
  }

  openAIDiagnostic() {
    const dialogRef = this.dialog.open(AiDiagnosticDialogComponent, {
      width: '600px',      // Adjust the width as needed
      height: '400px',     // Adjust the height as needed
      disableClose: true,  // Prevent closing by clicking outside
      // No need to set position for centering
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aiGeneratedSolution = result.analysis;
      }
    });
  }
}