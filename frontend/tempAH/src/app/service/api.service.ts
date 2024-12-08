import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';  // Import the User interface
import { Vendor } from '../model/vendor.model';
import { Service, ServiceDetail } from '../model/services.model';
import { Booking, ViewBooking } from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.lgm.gov.my/API_Tempah/api';  // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

//---------------------------AUTHENTICATION--------------------------------------------

    signup(user: User) {
        return this.http.post<any>(`${this.apiUrl}/Users/Register`, user);
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
    }

    resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { token, newPassword });
    }

//---------------------------USER--------------------------------------------
  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users/Register`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  updateUserStatus(userId: number, active: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}/status`, { active });
  }

  updateUser(user: any) {
    return this.http.put<any>(`${this.apiUrl}/Users/${user.userId}`, user);
  }

//---------------------------VENDORS--------------------------------------------
  registerVendor(vendor: Vendor): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Vendors`, vendor);
  }

  getVendor(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/Vendors`);
  }

  deleteVendor(vendorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vendors/${vendorId}`);
  }

  updateVendorStatus(userId: number, active: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Vendors/${userId}/status`, { active });
  }

  updateVendor(user: any) {
    return this.http.put<any>(`${this.apiUrl}/Vendors/${user.userId}`, user);
  }

  //---------------------------SERVICES--------------------------------------------
  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/Services`);
  }

  getServiceDetails(): Observable<ServiceDetail[]> {
    return this.http.get<ServiceDetail[]>(`${this.apiUrl}/ServiceDetails`);
  }
  AddServiceDetails(service: ServiceDetail): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Services`, service);
  }

  //---------------------------BOOKING--------------------------------------------
  AddBookAppointment(booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Bookings`, booking);
  }

  getBookAppointment(): Observable<ViewBooking[]> {
    let userid = sessionStorage.getItem('userid'); 
    console.log(userid)
    return this.http.get<ViewBooking[]>(`${this.apiUrl}/Bookings/api/Bookings/user/` + userid)
  }

  getBookAppointmentbyVendor(): Observable<ViewBooking[]> {
    let userid = sessionStorage.getItem('userid'); 
    console.log(userid)
    return this.http.get<ViewBooking[]>(`${this.apiUrl}/Bookings/api/Bookings/vendor/` + userid)
  }
}
