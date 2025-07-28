import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../Services/rent.service';
import { Rent } from '../interfaces/Rent';

@Component({
  selector: 'app-renter-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-history.component.html',
  styleUrls: ['./renter-history.component.css']
})
export class RenterHistoryComponent implements OnInit {
  historyRents: Rent[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit(): void {

// const useMockData = true;          //    false    شيلو الداتا  دي    او اعملوهااا

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
  this.rentService.getHistoryRents().subscribe({
    next: (data) => {
      this.historyRents = data;
      console.log('Fetched history rents:', data);       
    },
    error: (error) => {
      console.error('Error fetching history rents:', error);
    }
  });
}
}
