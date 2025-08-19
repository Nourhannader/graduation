import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface RenterSSN{
  SSN:string
}

@Injectable({
  providedIn: 'root'
})

export class GetStartedService {
_HttpClient=inject(HttpClient)

  GetStarted(info:FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post('http://livana.runasp.net/api/Renter', info, { headers });
  }
}
