import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class FormService{

    constructor(private http: HttpClient){}

    storedata(data: any): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}/User/formdata`, data);
    }
} 


