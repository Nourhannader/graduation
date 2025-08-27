// payment.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from '../interfaces/Rent';
import { environment } from '../environments/environment';

 export interface RentID {
     rentID:number
  }

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private baseUrl=environment.apiUrl;
  constructor() {}

  _HttpClient = inject(HttpClient);
  // getStripeOnboardingUrl(ownerId: number): Observable<string> {
  //   const url = `https://localhost:5267/api/Payment/Stripe/onboarding?ownerId=${ownerId}`;
  //   return this.http.get(url, { responseType: 'text' });
  // }


pay(RentId:number):Observable<{ url: string }>
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<{ url: string }>(`${this.baseUrl}/Payment/CreateCheckoutSession/`, {RentId}, {headers});
}
  
}
