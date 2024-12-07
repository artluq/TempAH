import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  private userRole: number | null = null;  
  private fullname: string | null = null;
  private userid: number | null = null; 
  private loginUrl = 'http://localhost:8000/api/users/login/';
  private apiUrl = 'https://api.lgm.gov.my/API_Tempah/api/Users/Login'; 

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('access_token');
    const role = sessionStorage.getItem('role');
    const fullname = sessionStorage.getItem('fullname');
    if (token && role) {
      this.loggedIn.next(true);
      this.userRole = parseInt(role, 10);   // Convert role to integer
      this.fullname = fullname;
    }
    console.log(this.userRole)
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap((response) => {
        if (response.token && response.role) {
          sessionStorage.setItem('access_token', response.token);
          sessionStorage.setItem('role', response.role.toString());
          sessionStorage.setItem('fullname', response.fullname);
          sessionStorage.setItem('userid', response.userid);
          this.loggedIn.next(true);  // Emit loggedIn as true
          this.userRole = response.role;  // Update the role
          this.fullname = response.fullname;
          console.log('Logged in and role is:', this.userRole); // Debug
        }
      })
    );
  }
  

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('fullname'); // Remove fullname
    this.loggedIn.next(false);
    this.userRole = null;
    this.fullname = null;
  }

  getUserRole(): number | null {
    return this.userRole;
  }

  getFullname(): string | null {
    return this.fullname;
  }

  getUserId(): number | null {
    return this.userid;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }
}
