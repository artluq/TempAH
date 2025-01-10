import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.model';  // Import the User interface
import { Vendor } from '../model/vendor.model';
import { Service, ServiceDetail } from '../model/services.model';
import { Booking, ViewBooking } from '../model/appointment.model';
import { NumericValueAccessor } from '@ionic/angular';
import { Statistics } from '../model/statistic.model';

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

  // Get user statistics (new, active, inactive)
  getUserStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/users/statistics`);
  }

  getProfile(): Observable<User> {
    let userid = sessionStorage.getItem('userid');
    return this.http.get<User>(`${this.apiUrl}/users/` + userid)
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

  changePassword(passwordData: { currentPassword: string, newPassword: string, confirmNewPassword: string }): Observable<any> {
    let userid = sessionStorage.getItem('userid');
    return this.http.put(`${this.apiUrl}/users/`+ userid + `/change-password`, passwordData);
  }
  

//---------------------------VENDORS--------------------------------------------
   registerVendor(formData: FormData) {
    return this.http.post<{ vendor: Vendor; message: string }>(`${this.apiUrl}/Vendors/UploadVendorImage`, formData);  // Replace with your API endpoint
  }


  // Get user statistics (new, active, inactive)
  getVendorStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/Vendors/statistics`);
  }


  getVendorInfo(vendorId: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/Vendors/${vendorId}`).pipe(
      map((vendor) => {
        if (vendor.imagePath) {
          // Prepend base URL if necessary
          vendor.imagePath = `https://api.lgm.gov.my/API_Tempah/images${vendor.imagePath.split('/images')[1]}`;
        }
        return vendor;
      })
    );
  }
  
  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/vendors/${vendor.vendorId}`, vendor);
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

  // updateVendor(user: any) {
  //   return this.http.put<any>(`${this.apiUrl}/Vendors/${user.userId}`, user);
  // }

  //---------------------------SERVICES--------------------------------------------
  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/Services`);
  }

  getServiceDetails(vendorId: number): Observable<ServiceDetail[]> {
    return this.http.get<ServiceDetail[]>(`${this.apiUrl}/ServiceDetails/detail/${vendorId}`);
  }

  getAllServiceDetails(): Observable<ServiceDetail[]> {
    return this.http.get<ServiceDetail[]>(`${this.apiUrl}/ServiceDetails`);
  }
  AddServiceDetails(service: ServiceDetail): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Services`, service);
  }

  //---------------------------BOOKING--------------------------------------------
  getAvailableSlot(vendorId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/Bookings/availableSlots?vendorId=${vendorId}&date=${date}`
    );
  }
  

  AddBookAppointment(booking: Booking): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Bookings`, booking);
  }

  getBookAppointment(): Observable<ViewBooking[]> {
    let userid = sessionStorage.getItem('userid');
    return this.http.get<ViewBooking[]>(`${this.apiUrl}/Bookings/api/Bookings/user/` + userid)
  }
  
  getHistoryAppointment(): Observable<ViewBooking[]> {
    let userid = sessionStorage.getItem('userid');
    console.log(userid)
    return this.http.get<ViewBooking[]>(`${this.apiUrl}/Bookings/api/BookingsHistory/user/` + userid)
  }

  getBookAppointmentbyVendor(): Observable<ViewBooking[]> {
    let userid = sessionStorage.getItem('vendorid');
    console.log(userid)
    return this.http.get<ViewBooking[]>(`${this.apiUrl}/Bookings/api/Bookings/vendor/` + userid)
  }

  getBookingInfo(bookingId: number): Observable<ViewBooking> {
    return this.http.get<ViewBooking>(`${this.apiUrl}/Bookings/${bookingId}`)
  }

  updateBookingStatus(bookingId: number, statusId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Bookings/updateStatus/${bookingId}`, statusId, {
        headers: { 'Content-Type': 'application/json' }
    });
}


    


  updateAppointmentStatus(appointmentId: number, status: string): Observable<any> {
    return this.http.put(`your-api-endpoint/appointments/${appointmentId}/status`, { status });
  }
  
  
}
