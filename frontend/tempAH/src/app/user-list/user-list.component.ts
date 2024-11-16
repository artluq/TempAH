import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../model/user.model';  // Import the User interface

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isAddingUser = false;
  newUser = { userId: 0, fullName: '', email: '', roleId: 0, isActive: true, passwordHash: '', username: '', phoneNumber:'', createdAt:  new Date(), role: '' };
  sortColumn: string = ''; // Track which column is being sorted
  sortDirection: boolean = true; // Track the direction of sorting (true = ascending, false = descending)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  toggleAddUserForm() {
    this.isAddingUser = !this.isAddingUser;
    this.newUser = { userId: 0, fullName: '', email: '', roleId: 0, isActive: true, passwordHash: '', username: '', phoneNumber:'', createdAt:  new Date(), role: ''  }; // Reset form
  }

  cancelAddUser() {
    this.isAddingUser = false;
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

 // Sorting function
 sortList(column: string) {
  if (this.sortColumn === column) {
    this.sortDirection = !this.sortDirection; // Toggle sort direction if the same column is clicked
  } else {
    this.sortColumn = column; // Set new column to sort by
    this.sortDirection = true; // Default to ascending
  }

  this.users.sort((a, b) => {
    const key = column as keyof User; // Ensure the column is a valid key of User
    if (a[key] < b[key]) {
      return this.sortDirection ? -1 : 1; // Ascending or descending
    }
    if (a[key] > b[key]) {
      return this.sortDirection ? 1 : -1;
    }
    return 0; // Equal values
  });
}

  // Method to toggle the user's active status
  toggleUserStatus(user: User) {
    user.isActive = !user.isActive; // Toggle the active status
    this.apiService.updateUserStatus(user.userId, user.isActive).subscribe(
      () => {
        console.log('User status updated successfully');
      },
      (error) => {
        console.error('Error updating user status:', error);
        // Revert the status back if update fails
        user.isActive = !user.isActive;
      }
    );
  }

// Open the Add User modal
openAddUserModal() {
  this.isAddingUser = true;
}

// Close the Add User modal
closeAddUserModal() {
  this.isAddingUser = false;
}

// Handle form submission
submitUser() {
  if (this.newUser) {
    console.log('User Submitted:', this.newUser);
    this.apiService.registerUser(this.newUser).subscribe(
      (response: any) => {
        this.users.push(response.user);  // Add the new user to the list
        this.closeAddUserModal();  // Hide the form
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }
 

}
isEditingUser = false; // Track if the edit modal is open
selectedUser: any = null; // Holds the user being edited

// Open the Edit User modal
editUser(user: any) {
  this.selectedUser = { ...user }; // Clone the user object to avoid direct modification
  this.isEditingUser = true;
}

// Close the Edit User modal
closeEditUserModal() {
  this.isEditingUser = false;
  this.selectedUser = null;
}

// Update user details
updateUser() {
  if (this.selectedUser) {
    // Call the backend to update the user
    this.apiService.updateUser(this.selectedUser).subscribe(
      (response) => {
        // Update the local user list with the edited user
        const index = this.users.findIndex((u) => u.userId === this.selectedUser.userId);
        if (index !== -1) {
          this.users[index] = response;
        }
        this.closeEditUserModal();
      },
      (error) => {
        console.error('Failed to update user:', error);
      }
    );
  }
}

deleteUser(user: User) {
  if (confirm(`Are you sure you want to delete user "${user.fullName}"?`)) {
    this.apiService.deleteUser(user.userId).subscribe({
      next: () => {
        // Remove the user from the local list
        this.users = this.users.filter(u => u.userId !== user.userId);
        alert('User deleted successfully.');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    });
  }
}



}
