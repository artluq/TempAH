import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-vendor',
  templateUrl: './dashboard-vendor.component.html',
  styleUrls: ['./dashboard-vendor.component.css']
})
export class DashboardVendorComponent implements OnInit {
  vendorStats = [
    { label: 'New', count: 10 },
    { label: 'Active', count: 120 },
    { label: 'Inactive', count: 45 },
  ];

  userStats = [
    { label: 'New', count: 25 },
    { label: 'Active', count: 300 },
    { label: 'Inactive', count: 75 },
  ];


  // Upcoming Appointments Data
  upcomingAppointments = [
    { date: '2024-11-10', time: '10:00 AM', service: 'Oil Change', customer: 'customer A' },
    { date: '2024-11-15', time: '02:00 PM', service: 'Tire Rotation', customer: 'customer B' },
    // Add more appointments as needed
  ];

  constructor() {}

  ngOnInit(): void {}
}
