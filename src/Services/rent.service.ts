import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from '../interfaces/Rent';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private baseUrl=environment.apiUrl;
  private _HttpClient = inject(HttpClient);

  constructor() {}

  getHistoryRents(): Observable<Rent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Rent[]>(`${this.baseUrl}/Rent/HistoryRents`, { headers });
  }

  getUnpaidRents(): Observable<Rent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Rent[]>(`${this.baseUrl}/Rent/UnpaidRents`, { headers });
  }
}
