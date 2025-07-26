import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../Services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() rentId: number | null = null;

  renterId!: number;  //    @ 

  fullName = '';
  cardNumber = '';
  expiryDate = '';
  cvv = '';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    if (this.rentId !== null) {
      this.renterId = this.rentId;
    } else {
      this.route.queryParams.subscribe(params => {
        const renterId = +params['renterId']; //
        this.renterId = renterId;
        console.log('Renter ID from query params:', renterId);
      });
    }
  }

  confirmPayment(): void {
    if (!this.renterId) {
      alert("Missing renter ID");
      return;
    }

    this.paymentService.getStripeOnboardingUrl(this.renterId).subscribe({
      next: (url: string) => {
        window.location.href = url;
      },
      error: err => {
        console.error('Error getting Stripe URL:', err);
        alert("Something went wrong. Try again later.");
      }
    });
  }
}
