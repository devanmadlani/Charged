import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { TYPEFORM_FORMS } from '@app-core';

@Injectable({ providedIn: 'root' })
export class TypeformService {
  private API_BASE = 'https://api.typeform.com';
  private ACCESS_TOKEN = TYPEFORM_FORMS.feedback.typeformToken;
  private BACKEND_BASE = environment.backendBaseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    });
  }

  getFormDetails(formId: string): Observable<any> {
    return this.http.get(`${this.API_BASE}/forms/${formId}`, {
      headers: this.getHeaders(),
    });
  }

  getFormResponses(formId: string): Observable<any> {
    return this.http.get(`${this.API_BASE}/forms/${formId}/responses`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * TODO: move to its own service
   * Get submitted answers from our backend */
  getSubmittedResponse(userId: string): Observable<any> {
    return this.http.get(`${this.BACKEND_BASE}/form-response/${userId}`);
  }
}
