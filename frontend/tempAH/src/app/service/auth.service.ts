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
  private loginUrl = 'http://localhost:8000/api/login/';

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('access_token');
    const role = sessionStorage.getItem('role');
    if (token && role) {
      this.loggedIn.next(true);
      this.userRole = role;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      tap((response: any) => {
        if (response.access) {
          sessionStorage.setItem('access_token', response.access);
          sessionStorage.setItem('role', response.role);
          this.userRole = response.role;
          this.loggedIn.next(true);
        }
      })
    );
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
