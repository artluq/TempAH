import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
user: User | null = null;

constructor(private authService: ApiService) {}

ngOnInit(): void {
  this.getProfile();
}

getProfile(): void {
  this.authService.getProfile().subscribe({
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
  alert('Edit profile functionality goes here.');
}

changePassword(): void {
  alert('Change password functionality goes here.');
}
}