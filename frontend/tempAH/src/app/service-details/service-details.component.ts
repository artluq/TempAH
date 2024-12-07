import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ServiceDetail } from '../model/services.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
  services: ServiceDetail[] = [];
  selectedService: any = null;

  constructor(private Service: ApiService) {}

  ngOnInit(): void {
    this.getServices();
  }

  // Fetching the list of services from the API or service
  getServices(): void {
    this.Service.getServiceDetails().subscribe(
      (response: any) => {
        this.services = response;
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  // Handle selecting a service
  selectService(service: any): void {
    this.selectedService = service;
    console.log('Service selected:', service);
    // You can now proceed to book the appointment for the selected service
    // or navigate to another page for further steps.
  }
}