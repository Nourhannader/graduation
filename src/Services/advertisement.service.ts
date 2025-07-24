import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface AddAds{
  success:boolean,
  message:string
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
}



//http://localhost:5267/api/Advertisement/