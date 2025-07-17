import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { Unit } from '../../interfaces/unit';


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
  
    _router=inject(Router)
  _ActivatedRoute=inject(ActivatedRoute)
  _UnitsService=inject(UnitsService);

  ngOnInit(): void {
    this.unitId=Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._UnitsService.getUnitById(this.unitId).subscribe({
      next:(data)=>{
        this.unit=data;
        console.log(this.unit);

        if(!this.unit) return
        this.images = this.unit
      ? [this.unit.image1, this.unit.image2, this.unit.image3].filter(img => !!img) as string[]
      : [];

      if (this.images.length > 0) {
      this.currentImage = this.images[0];
      }
  
      },
      error:(err)=>{
        console.error('Error fetching unit details:', err);
      }
    })
    

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

    edit()
  {
    this._router.navigate([`/ownerHome/editUnit/${this.unitId}`])
  }

}
