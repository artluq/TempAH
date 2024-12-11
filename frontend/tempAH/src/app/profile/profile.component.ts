import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
  user: User = {
  userId: 1,
  username: 'johndoe',
  passwordHash: 'hash123',
  email: 'johndoe@example.com',
  fullName: 'John Doe',
  phoneNumber: '123456789',
  createdAt: new Date('2023-01-01'),
  isActive: true,
  roleId: 1,
  role: 'Administrator',
};

constructor() {}

ngOnInit(): void {
  // Optionally fetch user data from an API or service
}

editProfile(): void {
  alert('Edit profile functionality goes here.');
}

changePassword(): void {
  alert('Change password functionality goes here.');
}
}