import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from '../interfaces/Rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private _HttpClient = inject(HttpClient);

  constructor() {}

  getHistoryRents(): Observable<Rent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Rent[]>('http://livana.runasp.net/api/Rent/HistoryRents', { headers });
  }

  getUnpaidRents(): Observable<Rent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Rent[]>('http://livana.runasp.net/api/Rent/UnpaidRents', { headers });
  }
}
