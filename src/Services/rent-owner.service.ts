import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentService {

_HttpClient=inject(HttpClient)

getMonthRents(month: number, year: number):Observable<any> {

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
  return this._HttpClient.get<any>(`http://livana.runasp.net/api/Rent/MonthRents?month=${month}&year=${year}`, { headers });
  }

}
