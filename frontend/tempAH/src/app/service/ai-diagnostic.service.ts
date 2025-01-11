// ai-diagnostic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DiagnosticResponse {
  success: boolean;
  analysis: string | null;
  errorMessage: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AiDiagnosticService {
  // Direct Heroku Flask service URL
  private flaskUrl = 'https://tempah-e94b37d8b5ba.herokuapp.com/diagnose';

  constructor(private http: HttpClient) {}

  getDiagnostic(responses: { [key: string]: string }): Observable<DiagnosticResponse> {
    // Log the request for debugging
    console.log('Sending request to Flask:', this.flaskUrl);
    console.log('Request payload:', { Responses: responses });

    // Send request directly to Flask
    return this.http.post<DiagnosticResponse>(
      this.flaskUrl,
      { Responses: responses }
    );
  }
}