
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advertisement } from '../interfaces/advertisement';
import { AppointmentAv } from '../interfaces/appointmentAv';
import { Reservation } from '../interfaces/reservation';
import { environment } from '../environments/environment';


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
  appointmentDate:string,
  advertisementId:number
}

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
   private baseUrl=environment.apiUrl;
  _HttpClient=inject(HttpClient)

  constructor() { }

  AddAds(id: number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<AddAds>(`${this.baseUrl}/Advertisement/${id}`, {},{ headers });
  }
  

  getAllAds():Observable<Advertisement[]>{
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Advertisement[]>(`${this.baseUrl}/Advertisement`);
  }

   getTwoAds():Observable<Advertisement[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Advertisement[]>(`${this.baseUrl}/Advertisement/LastTwo`,{headers});
  }

  DeleteAds(id:number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<AddAds>(`${this.baseUrl}/Advertisement/${id}`,{headers});
  }
  
  getByOwner():Observable<AdsByOwner[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AdsByOwner[]>(`${this.baseUrl}/Advertisement/get`,{headers})
  }

  AddAppointment(appoinment:Appointment):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<AddAds>(`${this.baseUrl}/Appointment`,appoinment,{headers})
  }

  getAppointmentByOwner():Observable<AppointmentByOwner[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AppointmentByOwner[]>(`${this.baseUrl}/Appointment/get`,{headers})
  }

  deleteAppointment(id:number):Observable<AddAds>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<AddAds>(`${this.baseUrl}/Appointment/${id}`,{headers})
  }
  
  getAppointmentAvailble(id:number):Observable<AppointmentAv[]>{
    return this._HttpClient.get<AppointmentAv[]>(`${this.baseUrl}/Appointment/available/${id}`)
  }

  AddReservarion(reservation:Reservation):Observable<AddAds>{
    return this._HttpClient.post<AddAds>(`${this.baseUrl}/Reservation`,reservation);
  }
}



//http://localhost:5267/api/Advertisement/
//http://localhost:5267/api/Advertisement/LastTwo