import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  today = new Date();
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

  fullname: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fullname = this.authService.getFullname(); // Get fullname
  }
}
