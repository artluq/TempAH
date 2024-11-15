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
  private userRole: string | null = null;
  private loginUrl = 'http://localhost:8000/api/users/login/';
  private apiUrl = 'http://localhost:5246/api/Users/Login'; 

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('access_token');
    const role = sessionStorage.getItem('role');
    if (token && role) {
      this.loggedIn.next(true);
      this.userRole = role;
    }
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };
    return this.http.post<any>(this.apiUrl, loginData);
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('role');
    this.loggedIn.next(false);
    this.userRole = null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}
