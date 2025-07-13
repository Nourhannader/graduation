import { Component, inject, OnInit } from '@angular/core';
import { Unit } from '../../Interface/unit';
import { ActivatedRoute } from '@angular/router';
import { UnitsService } from '../../Service/units.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  unitId:number |null = null;
  unit: Unit | undefined;

  currentImage: string = '';
  private imageIndex = 0;
  images:string[]=[]
  
  _ActivatedRoute=inject(ActivatedRoute)
  _UnitsService=inject(UnitsService);

  ngOnInit(): void {
    this.unitId=Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this.unit=this._UnitsService.getUnitById(this.unitId)
    if(!this.unit) return
    this.images = this.unit
      ? [this.unit.image1, this.unit.image2, this.unit.image3].filter(img => !!img) as string[]
      : [];

      if (this.images.length > 0) {
      this.currentImage = this.images[0];
      }

  }

  nextImage() {
    this.imageIndex = (this.imageIndex + 1) % this.images.length;
    this.currentImage=this.images[this.imageIndex]
  }

  prevImage() {
    this.imageIndex =
      (this.imageIndex - 1 + this.images.length) % this.images.length;
      this.currentImage=this.images[this.imageIndex]
  }

}
