import { Component, OnInit, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../Services/payment.service';
import { FormsModule } from '@angular/forms';
import e from 'express';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentId: number | null = null;
  fullName = '';
  cardNumber = '';
  expiryDate = '';
  cvv = '';
  _router=inject(Router);
  _ActivatedRoute=inject(ActivatedRoute);  
  _PaymentService=inject(PaymentService)   
 

  ngOnInit(): void {
    this.rentId=Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log('Rent ID from route:', this.rentId);
  }



  confirmPayment(): void {
    if (!this.rentId) {
      alert("Missing rent ID");
      return;

    } 
    
    else if (!this.fullName || !this.cardNumber || !this.expiryDate || !this.cvv) {
      alert("Please fill in all payment details");
      return;
    }


    else if(this.cardNumber.length !== 16 || this.cvv.length!==3 || this.expiryDate.match(/^\d{2}\/\d{2}$/)){
      alert("Please enter valid card details");
      return;
    }

      else{
        this._PaymentService.pay(this.rentId).subscribe({
          next: (response) => {
            console.log('Payment successful:', response);
            alert("Payment successful");
          },
          error: (err) => {
            console.error('Payment error:', err);
            alert("Payment failed");
          }
        });
    }

  }
}

//////////////////////////////////////////stripe///////////////////////////////////////////
// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
// import { PaymentService } from '../Services/payment.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-payment',
//   standalone: true,
//   imports: [],
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })

// export class PaymentComponent implements OnInit, AfterViewInit {
//   stripe: Stripe | null = null;
//   elements!: StripeElements;
//   rentId: number | null = null;
//   clientSecret = '';

//   constructor(
//     private route: ActivatedRoute,
//     private paymentService: PaymentService
//   ) {}

//   ngOnInit() {
//     this.rentId = Number(this.route.snapshot.paramMap.get('id'));
//   }

//   async ngAfterViewInit() {
//     if (!this.rentId) return;

//     this.paymentService.pay(this.rentId).subscribe(async (res) => {
//       this.clientSecret = res.clientSecret;
//       console.log('Client Secret:', this.clientSecret);
//       this.stripe = await loadStripe('pk_test_51Rn0VvIgZmpOI8hZPRRXQoi4crYrFaqHhcQH5MmKnAYODSVREIAYj9FBGcxgTf1zqSOowZhEpEegFWKwC5ydkA3d00bZ6RXQKh');
//       if (this.stripe) {
//         this.elements = this.stripe.elements();
//         const card = this.elements.create('card');
//         card.mount('#card-element');

//         const form = document.getElementById('payment-form')!;
//         form.addEventListener('submit', async (event) => {
//           event.preventDefault();

//           const result = await this.stripe?.confirmCardPayment(this.clientSecret, {
//             payment_method: { card }
//           });

//           if (result?.error) {
//             console.error('Stripe error:', result.error.message);
//             alert('Payment failed: ' + result.error.message);
//           } else if (result?.paymentIntent && result.paymentIntent.status === 'succeeded') {
//             alert('Payment successful!');
//           } else {
//             console.warn('Unexpected payment result:', result);
//             alert('Unexpected status — payment may have failed.');
//           }
//         });
//       }
//     }); 
//   }
// }
