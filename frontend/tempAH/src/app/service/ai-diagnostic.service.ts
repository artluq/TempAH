import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiDiagnosticService {
  private apiUrl = 'http://localhost:5246/api/AIdiagnostic';
  //I'm using the existing API URL from api.service.ts
  //Hopefully it works !!!!

  constructor(private http: HttpClient) {}

  getDiagnostic(problemDescription: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/diagnose`, { problemDescription });
  }
}