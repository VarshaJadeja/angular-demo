import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userprofile } from '@models/userprofile.model';
import { environment } from 'environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<Userprofile[]> {
    return this.http.get<Userprofile[]>(
      `${environment.baseUrl}/UserProfile/getAll`
    );
  }
  getPaginatedUser(
    page: number,
    pageSize: number
  ): Observable<{ totalCount: number; users: Userprofile[] }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ totalCount: number; users: Userprofile[] }>(
      `${environment.baseUrl}/UserProfile/getPaginatedData`,
      { params }
    );
  }

  updateUser(id: string, model: Userprofile, file?: File): Observable<any> {
    const formData = new FormData();

    // Append user data
    formData.append('User.Id', id);
    formData.append('User.FirstName', model.firstName);
    formData.append('User.LastName', model.lastName);
    formData.append('User.UserName', model.userName);
    formData.append('User.Email', model.email);
    formData.append('User.Password', model.password);

    // Append file if it exists
    if (file) {
      formData.append('ProfileImage', file);
    }
    console.log(formData);
    return this.http.post(
      `${environment.baseUrl}/UserProfile/updateUser`,
      formData
    );
  }

  addUser(model: Userprofile): Observable<any> {
    return this.http.post(`${environment.baseUrl}/UserProfile/addUser`, model);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/UserProfile/deleteUser?id=${id}`
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<Userprofile>(
      `${environment.baseUrl}/UserProfile/getUserById?id=${id}`
    );
  }
}
