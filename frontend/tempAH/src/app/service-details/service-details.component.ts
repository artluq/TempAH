import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ServiceDetail } from '../model/services.model';
import { AiDiagnosticDialogComponent } from '../components/ai-diagnostic-dialog/ai-diagnostic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
  services: ServiceDetail[] = [];
  selectedService: any = null;
  aiGeneratedSolution!: string;
  vendorId!: number;
  
  constructor(private Service: ApiService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.vendorId = Number(this.route.snapshot.paramMap.get('vendorId'));
    if (this.vendorId) {
      // Fetch service details using the vendorId
      this.Service.getServiceDetails(this.vendorId).subscribe(details => {
        this.services = details;
        // Process service details here
      });
    } else {
      console.error("Vendor ID is missing or invalid.");
    }
    // this.getServices();
  }

  // Fetching the list of services from the API or service
  getServices(): void {
    this.Service.getServiceDetails(this.vendorId).subscribe(
      (response: any) => {
        this.services = response;
        this.formatDetails();
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  formatDetails(): void {
    this.services = this.services.map(service => {
      service.details = this.formatBoldText(service.details);  // Format bold text
      return service;
    });
  }

  toArray(details: string | string[]): string[] {
    if (Array.isArray(details)) {
      return details;
    } else if (typeof details === 'string') {
      return details.split(';');
    }
    return [];
  }

  formatBoldText(details: string | string[]): string[] {
    if (Array.isArray(details)) {
      return details.map(detail => this.applyBold(detail));
    } else if (typeof details === 'string') {
      return details.split(';').map(detail => this.applyBold(detail));
    }
    return [];
  }

  applyBold(detail: string): string {
    const boldPattern = /\*\*(.*?)\*\*/g;  // Regex to match text between ** and **
    return detail.replace(boldPattern, '<strong>$1</strong>');  // Wrap the matched text in <strong> tags
  }
  
  // Handle selecting a service
  selectService(service: any): void {
    this.selectedService = service;
    console.log('Service selected:', service);
    sessionStorage.setItem('selectedService', JSON.stringify(service));
    const isLoggedIn = sessionStorage.getItem('access_token'); // Check login status
    if (isLoggedIn) {
      this.router.navigate(['/bookappointment'], { state: { service } }); // Pass service details
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/bookappointment' } });
    }
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