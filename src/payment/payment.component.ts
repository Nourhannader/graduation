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
    // if (this.rentId !== null) {
    //   this.renterId = this.rentId;
    // } else {
    //   this.route.queryParams.subscribe(params => {
    //     const renterId = +params['renterId']; //
    //     this.renterId = renterId;
    //     console.log('Renter ID from query params:', renterId);
    //   });
    // }
    // this.route.queryParams.subscribe(params => {
    //   this.rentId = +params['rentId'] || null;
    //   console.log('Rent ID from query params:', this.rentId);

    // });
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
