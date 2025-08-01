
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advertisement } from '../interfaces/advertisement';
import { AppointmentAv } from '../interfaces/appointmentAv';
import { Reservation } from '../interfaces/reservation';


export interface AddAds{
  success:boolean,
  message:string
}

export interface AdsByOwner{
  adID:number,
  city?:string,
  street ?:string,
  area ?:string,
  flatNumber ?:string,
  buildingNumber ?:string,
}

export interface AppointmentByOwner{
  id:number,
  dateTime:Date,
  city?:string,
  street ?:string,
  area ?:string,
  flatNumber ?:string,
  buildingNumber ?:string,
}

export interface Appointment{
  appointmentDate:Date,
  advertisementId:number
}

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  _HttpClient=inject(HttpClient)

  constructor() { }

  AddAds(id: number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<AddAds>(`http://localhost:5267/api/Advertisement/${id}`, {},{ headers });
  }
  

  getAllAds():Observable<Advertisement[]>{
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Advertisement[]>('http://localhost:5267/api/Advertisement');
  }

   getTwoAds():Observable<Advertisement[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Advertisement[]>('http://localhost:5267/api/Advertisement/LastTwo',{headers});
  }

  DeleteAds(id:number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<AddAds>(`http://localhost:5267/api/Advertisement/${id}`,{headers});
  }
  
  getByOwner():Observable<AdsByOwner[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AdsByOwner[]>('http://localhost:5267/api/Advertisement/get',{headers})
  }

  AddAppointment(appoinment:Appointment):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<AddAds>('http://localhost:5267/api/Appointment',appoinment,{headers})
  }

  getAppointmentByOwner():Observable<AppointmentByOwner[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AppointmentByOwner[]>('http://localhost:5267/api/Appointment/get',{headers})
  }

  deleteAppointment(id:number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<AddAds>(`http://localhost:5267/api/Appointment/${id}`,{headers})
  }
  
  getAppointmentAvailble(id:number):Observable<AppointmentAv[]>{
    return this._HttpClient.get<AppointmentAv[]>(`http://localhost:5267/api/Appointment/available/${id}`)
  }

  AddReservarion(reservation:Reservation):Observable<AddAds>{
    return this._HttpClient.post<AddAds>('http://localhost:5267/api/Reservation',reservation);
  }
}



//http://localhost:5267/api/Advertisement/
//http://localhost:5267/api/Advertisement/LastTwo