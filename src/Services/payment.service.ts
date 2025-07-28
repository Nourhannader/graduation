// payment.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from '../interfaces/Rent';

 export interface RentID {
     rentID:number
  }

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor() {}

  _HttpClient = inject(HttpClient);
  // getStripeOnboardingUrl(ownerId: number): Observable<string> {
  //   const url = `https://localhost:5267/api/Payment/Stripe/onboarding?ownerId=${ownerId}`;
  //   return this.http.get(url, { responseType: 'text' });
  // }


pay(RentId:number):Observable<any>
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<any>(`http://localhost:5267/api/Payment/Payment/`, {RentId}, {headers});
}
  
}
