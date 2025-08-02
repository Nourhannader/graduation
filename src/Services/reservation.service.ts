import { AddAds } from './advertisement.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllReservation } from '../interfaces/all-reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }
  _HttpClient=inject(HttpClient)

  AllReservation():Observable<AllReservation[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AllReservation[]>(`http://localhost:5267/api/Reservation`,{ headers });
  }

  EditReservation(status:string,id:number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.put<AddAds>(`http://localhost:5267/api/Reservation/${id}?status=${status}`,{},{headers})
  }

}
