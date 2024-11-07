import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: false }
  ];

  ngOnInit(): void {}

  addUser() {
    // Logic to add a new user
  }

  editUser(user: User) {
    // Logic to edit user details
  }

  deleteUser(user: User) {
    // Logic to delete the user
  }

  toggleUserStatus(user: User) {
    user.active = !user.active;
  }
}