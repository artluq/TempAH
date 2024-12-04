import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = ''; // You can retrieve this from the AuthService or session storage
  upcomingAppointments = [
    { date: '2024-11-10', service: 'Oil Change', time: '10:00 AM', location: 'workshop A' },
    { date: '2024-11-15', service: 'Tire Rotation', time: '02:00 PM', location: 'workshop B' }
];

  recentServices = [
    { name: 'Brake Inspection', price: 75 },
    { name: 'Battery Replacement', price: 120 },
    { name: 'Transmission Fluid Change', price: 150 }
  ];
  notifications = [
    'New promotional offers available for this month!',
    'Reminder: Your next appointment is coming up soon.'
  ];
  totalAppointments = 5; // Example data
  totalRevenue = 450; // Example data

  constructor() {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || 'User'; 
  }

  bookNewAppointment() {
    // Logic to navigate to the booking page
    // this.router.navigate(['/bookappointment']);
  }

  viewUpcomingAppointments() {
    // Logic to view detailed upcoming appointments
    // this.router.navigate(['/appointments']);
  }
}
