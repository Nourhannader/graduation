
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


export interface numbers{
userCount:number,
ownerCount:number,
renterCount:number,
unitCount:number,
emptyUnitCount:number,
emptyForRentUnitCount:number,
emptyForSellUnitCount:number,
busyUnitCount:number,
busyForRentUnitCount:number,
busyForSellUnitCount:number,
communityCount:number,
adCount:number,
totalProfit:number
}

export interface AdsVsReservations {
  month: string;
  adsCount: number;
  reservationsCount: number;
}

export interface Profit {
  month: string;
  profit: number;
}

export interface ProfitCommunity{
  comunityName:string,
  profit:number
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  _HttpClient=inject(HttpClient)
  constructor() { }

  getNumbers():Observable<numbers>{
   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
   return this._HttpClient.get<numbers>('http://localhost:5267/api/Admin/Numbers',{headers})
  }
  getadsVsReservayion():Observable<AdsVsReservations[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AdsVsReservations[]>('http://localhost:5267/api/Admin/adsVsReservations',{headers})
  }

  getProfitCommunity():Observable<ProfitCommunity[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<ProfitCommunity[]>('http://localhost:5267/api/Admin/profitperCommunity',{headers})
  }
}
