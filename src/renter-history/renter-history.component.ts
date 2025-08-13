import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../Services/rent.service';
import { Rent } from '../interfaces/Rent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-renter-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-history.component.html',
  styleUrls: ['./renter-history.component.css']
})
export class RenterHistoryComponent implements OnInit ,OnDestroy{
  private subscriptions:Subscription[]=[]
  historyRents: Rent[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit(): void {

// const useMockData = true;        
//   if (useMockData) {
//     this.historyRents = [
//       {
//         rentId: 1,
//         rentStatus: 'unpaid',
//         rentValue: 2000,
//         dueDate: '2025-06-01',
//         paymentDate: '2025-06-05'
//       },
//       {
//         rentId: 2,
//         rentStatus: 'Paid',
//         rentValue: 2500,
//         dueDate: '2025-07-01',
//         paymentDate: '2025-07-02'
//       }
//     ];
//   } else

   this.getHistory();
  }


getHistory(){
 const sub=  this.rentService.getHistoryRents().subscribe({
    next: (data) => {
      this.historyRents = data;
      console.log('Fetched history rents:', data);       
    },
    error: (error) => {
      console.error('Error fetching history rents:', error);
    }
  });
  this.subscriptions.push(sub);
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }
}
