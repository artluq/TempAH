import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Service } from '../model/services.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {
  services: Service[] = [];
  serviceForm: FormGroup;
  editingService: Service | null = null;

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0]
    });
  }

  ngOnInit(): void {
    // Load initial services
    this.loadServices();
  }

  loadServices() {
    // Dummy data for services; in real scenario, this will be fetched from a backend API
    this.services = [
      { serviceId: 1, serviceName: 'Oil Change', description: 'Full oil change service', price: 30 },
      { serviceId: 2, serviceName: 'Brake Inspection', description: 'Check brake system', price: 20 }
    ];
  }

  addService() {
    const newService: Service = {
      serviceId: this.services.length + 1,
      serviceName: this.serviceForm.value.name,
      description: this.serviceForm.value.description,
      price: this.serviceForm.value.price
    };

    this.services.push(newService);
    this.serviceForm.reset();
  }

  editService(service: Service) {
    this.editingService = service;
    this.serviceForm.setValue({
      name: service.serviceName,
      description: service.description,
      price: service.price
    });
  }

  updateService() {
    if (this.editingService) {
      this.editingService.serviceName = this.serviceForm.value.name;
      this.editingService.description = this.serviceForm.value.description;
      this.editingService.price = this.serviceForm.value.price;
      this.serviceForm.reset();
      this.editingService = null;
    }
  }

  deleteService(serviceId: number) {
    this.services = this.services.filter(service => service.serviceId !== serviceId);
  }
}