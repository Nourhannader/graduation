import { Component, inject, OnInit } from '@angular/core';
import { UnitComponent } from '../unit/unit.component';
import { Unit } from '../../Interface/unit';
import { UnitsService } from '../../Service/units.service';

@Component({
  selector: 'app-units',
  imports: [UnitComponent],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {

  units:Unit[]=[]
  _unitsService=inject(UnitsService)

  ngOnInit(): void {
    this.getAll()
  }


  getAll(){
    this.units=this._unitsService.getAllUnit();
  }

}
