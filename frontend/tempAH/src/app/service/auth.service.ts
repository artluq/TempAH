import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private userRole: string | null = null; // Store user role

  constructor() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role'); // Get the stored role
    if (username && role) {
      this.loggedIn.next(true);
      this.userRole = role; // Set the role if user is logged in
    }
  }

  login(username: string) {
    // Example role assignment based on the username
    if (username === 'admin') {
      this.userRole = 'admin';
    } else if (username === 'vendor') {
      this.userRole = 'vendor';
    } else {
      this.userRole = 'user';
    }

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('role', this.userRole); // Store the role in session storage
    this.loggedIn.next(true);
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role'); // Remove the role on logout
    this.loggedIn.next(false);
    this.userRole = null; // Clear user role
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserRole(): string | null {
    return this.userRole; // Return the current user role
  }
  
}
