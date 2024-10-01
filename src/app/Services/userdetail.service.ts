import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { environment } from 'environments/environment.development';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserdetailService {
  constructor(private http: HttpClient) {}
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/User/getAllUser`);
  }

  fetchUsers(
    page: number,
    pageSize: number,
    searchTerm: string,
    sortField: string,
    isAscending: boolean
  ): Observable<{ totalCount: number; users: User[] }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('sortField', sortField)
      .set('isAscending', isAscending.toString());

    return this.http
      .get<{ totalCount: number; users: User[] }>(
        `${environment.baseUrl}/User/userlist`,
        { params }
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching user data', error);
          throw error;
        })
      );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/User/delete/?id=${userId}`
    );
  }
  updateUser(id: string, userData: any): Observable<any> {
    const csvData = this.convertToCsv(id, userData);
    return this.http.post(`${environment.baseUrl}/User/EditDataById`, {
      id,
      newdata: csvData,
    });
  }
  addUser(user: any): Observable<any> {
    console.log(user);
    return this.http.post(`${environment.baseUrl}/User/AddUser`, user);
  }

  private convertToCsv(id: string, userData: any): string {
    // Convert the userData object to a CSV string
    const { firstName, lastName, email, jobTitle, title } = userData;
    return `${id},${firstName},${lastName},${email},${jobTitle},${title}`;
  }
}
