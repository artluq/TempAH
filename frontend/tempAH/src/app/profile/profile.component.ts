import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditMode = false;
  isChangePasswordMode = false;
  showPassword = false; // For toggling password visibility
  userToEdit: User = {
    userId: 0,
    fullName: '',
    email: '',
    phoneNumber: '',
    createdAt: new Date(),
    isActive: true,
    roleId: 0,
    role: ''
  };
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.apiService.getProfile().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log('User data fetched successfully:', this.user);
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      },
    });
  }

  editProfile(): void {
    this.isEditMode = true;
    this.userToEdit = { ...this.user };
  }

  saveChanges(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.userToEdit) return;

    this.apiService.updateUser(this.userToEdit).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.isEditMode = false;
        this.successMessage = 'Profile updated successfully!';
      },
      error: (err) => {
        this.errorMessage = 'Failed to update profile. Please try again.';
      },
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }

  enableChangePasswordMode(): void {
    this.isChangePasswordMode = true;
  }

  changePasswordSubmit(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmNewPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    this.apiService.changePassword(this.passwordData).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.isChangePasswordMode = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to change password. Please try again.';
      }
    });
  }

  cancelPasswordChange(): void {
    this.isChangePasswordMode = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
