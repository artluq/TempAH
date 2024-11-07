import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  vendorStats = [
    { label: 'New', count: 1 },
    { label: 'Active', count: 12 },
    { label: 'Inactive', count: 3 },
  ];

  userStats = [
    { label: 'New', count: 4 },
    { label: 'Active', count: 150 },
    { label: 'Inactive', count: 23 },
  ];

  constructor() {}

  ngOnInit(): void {
    // Ideally, fetch the stats data from a service here
  }
}
