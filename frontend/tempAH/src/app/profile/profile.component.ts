import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {
    fullname: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    dateOfBirth: '',

  };
  
  isEditing = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Load user profile from AuthService or any other service
    const username = sessionStorage.getItem('username');
    if (username) {
      // For demo purposes, assuming we fetch this from AuthService
      // this.userProfile = this.authService.getUserProfile(username); // Assume this method exists
    }
  }

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    // Logic to save updated profile information
    // this.authService.updateUserProfile(this.userProfile); // Assume this method exists
    this.isEditing = false;
  }

  cancelEdit() {
    this.loadUserProfile(); // Reload the original user profile
    this.isEditing = false;
  }
}