import { Component, inject, OnInit } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { Unit } from '../../Interface/unit';
import { UnitsService } from '../../Service/units.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-units',
  imports: [UnitComponent],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {

  units:Unit[]=[]
  searchTerm: string = '';
  showFilters: boolean = false;
  selectedStatus: string = '';
  selectedType: string = '';
  filterAll:string = '';

  _unitsService=inject(UnitsService)

  ngOnInit(): void {
    this.getAll()
  }

  toggleFilters() {
  this.showFilters = !this.showFilters;
  }

  selectAll() {
    this.filterAll = 'all';
    this.selectedStatus = '';
    this.selectedType = '';

    const statusRadio=document.getElementsByName('status') as NodeListOf<HTMLInputElement>;
    const typeRadio=document.getElementsByName('type') as NodeListOf<HTMLInputElement>;
    statusRadio.forEach(r => r.checked = false);
    typeRadio.forEach(r => r.checked = false);

  }

  updateStatus(event: Event) {
    this.selectedStatus = (event.target as HTMLInputElement).value; 
    this.filterAll = '';
    const allRadio = document.getElementsByName('all') as NodeListOf<HTMLInputElement>;
    allRadio.forEach(r => r.checked = false);
  }

  updateType(event: Event) {
    this.selectedType = (event.target as HTMLInputElement).value; 
    this.filterAll = '';
    const allRadio = document.getElementsByName('all') as NodeListOf<HTMLInputElement>;
    allRadio.forEach(r => r.checked = false);
  }

  filterUnits() {
    if(this.filterAll === 'all') {
      this.getAll();
    }else{
       this._unitsService.filterUnits(this.selectedStatus, this.selectedType).subscribe({
      next: (data) => {
        this.units = data;
        console.log('Filtered units:', this.units);
      },
      error: (err) => {
        console.error('Error filtering units:', err);
      }
    });
    }
  this.showFilters = false;
    
  }


  getAll(){
    this._unitsService.getAllUnit().subscribe({
      next:(data)=>{
        this.units=data;
        console.log(this.units);
      },error:(err)=>{
        console.error('Error fetching units:', err);  }
    });
  }

  searchUnits(){
    if (this.searchTerm.trim() === '') {
      this.getAll(); // If search term is empty, fetch all units
      return;
    }

    this._unitsService.searchUnits(this.searchTerm).subscribe({
      next: (data) => {
        this.units = data;
        console.log('Search results:', this.units);
      },
      error: (err) => {
        console.error('Error searching units:', err);
      }
    });
  }

  updateSearch(event: Event) {
    this.searchTerm =(event.target as HTMLInputElement).value || '';
    console.log('Search term updated:', this.searchTerm);
  }

  
}
