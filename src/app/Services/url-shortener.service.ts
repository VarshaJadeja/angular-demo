import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  shortenUrl(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.apiUrl}/shorten`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'json' as 'json',
    });
  }
}
