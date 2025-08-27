import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface RenterSSN{
  SSN:string
}

@Injectable({
  providedIn: 'root'
})

export class GetStartedService {
    private baseUrl=environment.apiUrl;
_HttpClient=inject(HttpClient)

  GetStarted(info:FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post(`${this.baseUrl}/Renter`, info, { headers });
  }
}
