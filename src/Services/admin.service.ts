
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AllReser } from '../interfaces/all-reser';
import { environment } from '../environments/environment';


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
  communityName:string,
  profit:number
}

export interface Renters{
  firstName:string,
  lastName:string,
  userName:string,
  email:string,
  role:string,
  communityName:string,
  isActive:boolean

}

export interface Owners{
  id:string,
  firstName:string,
  lastName:string,
  userName:string,
  email:string,
  role:string,
  communityName:string,
  unitCount:number,
  adCount:number,
  isActive:boolean

}

export interface Transfer{
  oldOwnerId:string,
  newOwnerId:string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
   private baseUrl=environment.apiUrl
  _HttpClient=inject(HttpClient)
  constructor() { }

  getNumbers():Observable<numbers>{
   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
   return this._HttpClient.get<numbers>(`${this.baseUrl}/Admin/Numbers`,{headers})
  }
  getadsVsReservayion():Observable<AdsVsReservations[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AdsVsReservations[]>(`${this.baseUrl}/Admin/adsVsReservations`,{headers})
  }
  getProfitPermonth():Observable<Profit[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Profit[]>(`${this.baseUrl}/Admin/profitsPerMonth`,{headers})
  }

  getProfitCommunity():Observable<ProfitCommunity[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<ProfitCommunity[]>(`${this.baseUrl}/Admin/profitperCommunity`,{headers})
  }

  getALLREservation():Observable<AllReser[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<AllReser[]>(`${this.baseUrl}/Admin/AllReservation`,{headers})
  }

 getAllRenters():Observable<Renters[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Renters[]>(`${this.baseUrl}/Admin/Renters`, {headers})
}

// searchRentersByCommunity(community: string): Observable<Renters[]> {
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
//   return this._HttpClient.get<Renters[]>(`${this.baseUrl}/Admin/SearchByCommunity?community=${community}`, { headers });
// }

// RenterswithNoCommunity():Observable<Renters[]>{
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
//   return this._HttpClient.get<Renters[]>(`${this.baseUrl}/Admin/NoCommunity`, {headers})
// } 

getAllOwners():Observable<Owners[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Owners[]>(`${this.baseUrl}/Admin/Owners`, {headers})
}

TransferTo(transfer:Transfer):Observable<any>{
const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post(`${this.baseUrl}/Admin/Transfer`,transfer, {headers})
}
}