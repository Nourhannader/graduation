import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../Services/rent.service';
import { Rent } from '../interfaces/Rent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unpaid-rents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unpaid-rents.component.html',
  styleUrls: ['./unpaid-rents.component.css']
})
export class UnpaidRentsComponent implements OnInit {

  _router = inject(Router);
  unpaidRents: Rent[] = [];
  
  // @Output() navigateToPayment = new EventEmitter<number>();

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

  goToPayment(id: number) {
    // this.navigateToPayment.emit(id);
    this._router.navigate([`payment/${id}`]);
  }

getUnPaid()
{
  this.rentService.getUnpaidRents().subscribe({
    next: (data) => {
      this.unpaidRents = data;
      console.log('Fetched unpaid rents:', data);
    },
    error: (error) => {
      console.error('Error fetching unpaid rents:', error);
    }
  });
}

}
