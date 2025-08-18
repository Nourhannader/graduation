import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../Services/rent.service';
import { Rent } from '../interfaces/Rent';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentService } from '../Services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unpaid-rents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unpaid-rents.component.html',
  styleUrls: ['./unpaid-rents.component.css']
})
export class UnpaidRentsComponent implements OnInit ,OnDestroy {
  private subscriptions:Subscription[]=[]

  _router = inject(Router);
  unpaidRents: Rent[] = [];
  
  // @Output() navigateToPayment = new EventEmitter<number>();
  _PaymentService=inject(PaymentService)
  toastr=inject(ToastrService)
  constructor(private rentService: RentService) {}

  ngOnInit(): void {

//  const useMockData = false; 

//   if (useMockData) {
//     this.unpaidRents = [
//       {
//         rentId: 1,
//         rentStatus: 'Unpaid',
//         rentValue: 2500,
//         dueDate: '2025-08-01'
//       },
//       {
//         rentId: 2,
//         rentStatus: 'Unpaid',
//         rentValue: 3000,
//         dueDate: '2025-08-15'
//       }
//     ];
//   } else


this.getUnPaid();

  }

  goToPayment(rentId: number) {
    // this.navigateToPayment.emit(id);
    // this._router.navigate([`payment/${id}`]);
    console.log('Initiating payment for rent ID:', rentId);
    const sub= this._PaymentService.pay(rentId).subscribe({
          next: (response) => {
            console.log('Payment successful:', response);
            // alert("Payment successful");
            window.location.href = response.url;
          },
          error: (err) => {
            console.error('Payment error:', err);
            this.toastr.error("Payment failed");
          }
        });
      this.subscriptions.push(sub);
  }

getUnPaid()
{
  const sub =this.rentService.getUnpaidRents().subscribe({
    next: (data) => {
      this.unpaidRents = data;
      console.log('Fetched unpaid rents:', data);
    },
    error: (error) => {
      console.error('Error fetching unpaid rents:', error);
    }
  });
  this.subscriptions.push(sub);
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }
}
