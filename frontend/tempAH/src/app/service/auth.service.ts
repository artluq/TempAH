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
  private vendorid: number | null = null;
  private loginUrl = 'http://localhost:8000/api/users/login/';
  private apiUrl = 'https://api.lgm.gov.my/API_Tempah/api/Users/Login'; 

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('access_token');
    const role = sessionStorage.getItem('role');
    const fullname = sessionStorage.getItem('fullname');
    const vendorid = sessionStorage.getItem('vendorid');
    if (token && role) {
      this.loggedIn.next(true);
      this.userRole = parseInt(role, 10);   // Convert role to integer
      this.fullname = fullname; 
      this.vendorid = vendorid ? parseInt(vendorid, 10) : null; // Parse vendorid
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
          if (response.vendorid) { // Save vendorid if it exists in response
            sessionStorage.setItem('vendorid', response.vendorid);
            console.log(this.vendorid)
            this.vendorid = response.vendorid;
          }
          this.loggedIn.next(true);  // Emit loggedIn as true
          this.userRole = response.role; 
          this.fullname = response.fullname;
          console.log('Logged in and role is:', this.userid); // Debug
        }
      })
    );
  }
  
  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('fullname'); // Remove fullname
    sessionStorage.removeItem('userid'); // Remove userid
    sessionStorage.removeItem('vendorid'); // Remove vendorid
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
  getVendorId(): number | null { 
    return this.vendorid;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }
}
