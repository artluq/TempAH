import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Statistics } from '../model/statistic.model';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  today = new Date();
  userStatsArray: { label: string, count: number }[] = [];
  vendorStatsArray: { label: string, count: number }[] = [];
  fullname: string | null = null;

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fullname = this.authService.getFullname(); // Get fullname
    this.fetchUserStatistics();
    this.fetchVendorStatistics();
  }
  fetchUserStatistics(): void {
    this.apiService.getUserStatistics().subscribe(
      (data) => {
        // Transform userStats into an array of objects with label and count
        this.userStatsArray = [
          { label: 'New Users', count: data.new },
          { label: 'Active Users', count: data.active },
          { label: 'Inactive Users', count: data.inactive }
        ];
      },
      (error) => {
        console.error('Error fetching user statistics:', error);
      }
    );
  }

  fetchVendorStatistics(): void {
    this.apiService.getVendorStatistics().subscribe(
      (data) => {
        // Transform userStats into an array of objects with label and count
        this.vendorStatsArray = [
          { label: 'New Vendor', count: data.new },
          { label: 'Active Vendor', count: data.active },
          { label: 'Inactive Vendor', count: data.inactive }
        ];
      },
      (error) => {
        console.error('Error fetching user statistics:', error);
      }
    );
  }
}
