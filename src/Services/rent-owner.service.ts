import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
private baseUrl=environment.apiUrl;
_HttpClient=inject(HttpClient)

getMonthRents(month: number, year: number):Observable<any> {

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
  return this._HttpClient.get<any>(`${this.baseUrl}/Rent/MonthRents?month=${month}&year=${year}`, { headers });
  }

}
