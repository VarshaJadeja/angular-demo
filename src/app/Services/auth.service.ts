import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}/User/login`, credentials)
      .pipe(
        tap((response) => {
          if (response) {
            this.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('UserName', credentials.userName);
            localStorage.setItem('UserId', response.user.id);
          }
        })
      );
  }
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserId');
  }
  isAuthenticatedUser(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated;
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/User/register`, data);
  }
}
