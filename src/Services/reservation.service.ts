import { AddAds } from './advertisement.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllReservation } from '../interfaces/all-reservation';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl=environment.apiUrl;
  constructor() { }
  _HttpClient=inject(HttpClient)

  AllReservation():Observable<AllReservation[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AllReservation[]>(`${this.baseUrl}/Reservation`,{ headers });
  }

  EditReservation(status:string,id:number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.put<AddAds>(`${this.baseUrl}/Reservation/${id}?status=${status}`,{},{headers})
  }

}
