import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiDiagnosticService {
  private apiUrl = `${environment.apiUrl}/AIdiagnostic`;

  constructor(private http: HttpClient) {}

  getDiagnostic(responses: { [key: string]: string }): Observable<any> {
    console.log('Sending request to:', `${this.apiUrl}/diagnose`);
    console.log('Request payload:', responses);

    return this.http.post(`${this.apiUrl}/diagnose`, { Responses: responses });
  }
}