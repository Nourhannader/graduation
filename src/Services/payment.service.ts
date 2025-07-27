// payment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  getStripeOnboardingUrl(renterId: number): Observable<string> {
    const url = `https://localhost:5267/api/Payment/Stripe/onboarding?renterId=${renterId}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
