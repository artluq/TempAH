import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service, ServiceDetail } from '../model/services.model'; // Adjust path as necessary
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css'],
})
export class ServiceManagementComponent implements OnInit {
  serviceForm: FormGroup;
  services: Service[] = [];
  serviceDetails: ServiceDetail[] = [];
  editingService: boolean = false;

  constructor(private fb: FormBuilder, private service: ApiService) {
    this.serviceForm = this.fb.group({
      serviceId: [null, Validators.required],
      serviceTitle: ['', Validators.required],
      description: ['', Validators.required],
      details: ['', Validators.required],
      priceRange: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadAvailableServices();
    this.loadDropdownOptions();
  }

  loadAvailableServices(): void {
    this.service.getServiceDetails().subscribe(
      (data: ServiceDetail[]) => {
        this.serviceDetails = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching service options:', error);
      }
    );
  }

  loadDropdownOptions(): void {
    this.service.getService().subscribe(
      (data: Service[]) => {
        this.services = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

addService(): void {
  const newService = this.serviceForm.value;
  newService.isActive = true;
  this.service.AddServiceDetails(newService).subscribe(
    (response) => {
      // Handle success
      console.log('Service added successfully:', response);

      // Reload the service list after adding the new service
      this.loadAvailableServices();

      // Optionally, reset the form
      this.serviceForm.reset();
    },
    (error) => {
      // Handle error
      console.error('Error adding service:', error);
    }
  );
}

  

  editService(service: any): void {
    this.editingService = true;
    this.serviceForm.patchValue(service);
  }

  updateService(): void {
    const updatedService = this.serviceForm.value;
    
  }

  deleteService(serviceId: number): void {
    
  }
}
