import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  notificationsEnabled: boolean = false;
  newsletterSubscribed: boolean = false;
  vendorServiceEnabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Load saved settings from local storage or a service here, if applicable
    this.loadSettings();
  }

  loadSettings() {
    // Example of loading settings from local storage
    this.notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled') || 'false');
    this.newsletterSubscribed = JSON.parse(localStorage.getItem('newsletterSubscribed') || 'false');
    this.vendorServiceEnabled = JSON.parse(localStorage.getItem('vendorServiceEnabled') || 'false');
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
    localStorage.setItem('notificationsEnabled', JSON.stringify(this.notificationsEnabled));
  }

  toggleNewsletter() {
    this.newsletterSubscribed = !this.newsletterSubscribed;
    localStorage.setItem('newsletterSubscribed', JSON.stringify(this.newsletterSubscribed));
  }

  toggleVendorService() {
    this.vendorServiceEnabled = !this.vendorServiceEnabled;
    localStorage.setItem('vendorServiceEnabled', JSON.stringify(this.vendorServiceEnabled));
  }
}