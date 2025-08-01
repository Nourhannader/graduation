
import { Component, inject, OnInit } from '@angular/core';
import { RentService } from '../Services/rent-owner.service';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-rent',
  templateUrl: './owner-rent.component.html',
  styleUrls: ['./owner-rent.component.css'],
    imports: [CommonModule, ReactiveFormsModule],

})
export class OwnerRentComponent implements OnInit {
  rentForm!: FormGroup;
  rents: any[] = [];
  filteredRents: any[] = [];

  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder, private rentService: RentService) {}

  ngOnInit(): void {
    this.rentForm = this.fb.group({
      month: [this.currentMonth],
      year: [this.currentYear],
      status: ['all']
    });

    this.fetchRents(this.currentMonth, this.currentYear);
    //  console.log('Current Month:', this.currentMonth);  
    // console.log('Current Year:', this.currentYear);       
  }

  fetchRents(month: number, year: number) {
    this.rentService.getMonthRents(month, year).subscribe({
      next: (data) => {
        console.log('Fetched rents:', data);
        this.rents = data;
        this.applyFilter();
        console.log('Fetched rents:', this.rents);
      },
      error: (error) => {
        console.error('Error fetching rents:', error);
      }
    }); 
  }

  applyFilter() {
    const selectedStatus = this.rentForm.value.status;
    if (selectedStatus === 'all') {
      this.filteredRents = this.rents;
    } else {
      this.filteredRents = this.rents.filter(r => r.rentStatus === selectedStatus);
    }
  }

  onFilterChange() {
    const { month, year } = this.rentForm.value;
    this.fetchRents(month, year);
  }


}
