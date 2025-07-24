import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentService } from '../Services/rent.service';
import { Rent } from '../interfaces/Rent';

@Component({
  selector: 'app-unpaid-rents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unpaid-rents.component.html',
  styleUrls: ['./unpaid-rents.component.css']
})
export class UnpaidRentsComponent implements OnInit {

  unpaidRents: Rent[] = [];
  @Output() navigateToPayment = new EventEmitter<number>();

  constructor(private rentService: RentService) {}

  ngOnInit(): void {

 const useMockData = true; //     خليها false لما الباك يشتغل
                            // يا هند ويا نور 

  if (useMockData) {
    this.unpaidRents = [
      {
        rentId: 1,
        rentStatus: 'Unpaid',
        rentValue: 2500,
        dueDate: '2025-08-01'
      },
      {
        rentId: 2,
        rentStatus: 'Unpaid',
        rentValue: 3000,
        dueDate: '2025-08-15'
      }
    ];
  } else



    this.rentService.getUnpaidRents().subscribe(data => {
      this.unpaidRents = data;
    });
  }

  goToPayment(id: number) {
    this.navigateToPayment.emit(id);
  }
}
