import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-add-unit',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './owner-add-unit.component.html',
  styleUrl: './owner-add-unit.component.css'
})
export class OwnerAddUnitComponent {
      constructor(private toastr: ToastrService){}
    _unitsService=inject(UnitsService)


    AddUnitForm:FormGroup=new FormGroup({
    status:new FormControl(null,[Validators.required]),   //empty or not 
    description:new FormControl(null,[Validators.required]),
    type:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
    area:new FormControl(null,[Validators.required]),
    street:new FormControl(null,[Validators.required]),
    flatNumber:new FormControl(null),
    buildingNumber:new FormControl(null,[Validators.required]),
    // electricityNum:new FormControl(null,[Validators.required]),
    // waterNum:new FormControl(null,[Validators.required]),
    // gasNum:new FormControl(null,[Validators.required]),
    price:new FormControl(null,[Validators.required]),
    renterSSN:new FormControl(null), //required if it is not empyt
    image1:new FormControl(null),
    image2:new FormControl(null),
    image3:new FormControl(null),

  } )


selectedImages: { [key: string]: File } = {};

onFileSelected(event: any, imageKey: string) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedImages[imageKey] = file;
  }
}

//////////////////
   apiError:string=''
  //_authService=inject(AuthService)
  _router=inject(Router)

/////////////////

  AddUnit()
  {
    //console.log(this.registerForm)
    if(this.AddUnitForm.valid)
    {
      const formData = new FormData();  
      formData.append('status', this.AddUnitForm.get('status')?.value);
      formData.append('description', this.AddUnitForm.get('description')?.value);
      formData.append('type', this.AddUnitForm.get('type')?.value);
      formData.append('city', this.AddUnitForm.get('city')?.value);
      formData.append('area', this.AddUnitForm.get('area')?.value);
      formData.append('street', this.AddUnitForm.get('street')?.value);
      formData.append('buildingNumber', this.AddUnitForm.get('buildingNumber')?.value);
      // formData.append('electricityNum', this.AddUnitForm.get('electricityNum')?.value);
      // formData.append('waterNum', this.AddUnitForm.get('waterNum')?.value);
      // formData.append('gasNum', this.AddUnitForm.get('gasNum')?.value);
      formData.append('price', this.AddUnitForm.get('price')?.value);
      if(this.AddUnitForm.get('flatNumber')?.value!=null)
      {
        formData.append('flatNumber',this.AddUnitForm.get('flatNumber')?.value)
      }

      if (
        this.AddUnitForm.get('renterSSN')?.value != null &&
        this.AddUnitForm.get('status')?.value === 'busy' &&
        this.AddUnitForm.get('renterSSN')?.value !== '' &&
        this.AddUnitForm.get('renterSSN')?.value !== 'null' &&
        this.AddUnitForm.get('renterSSN')?.value !== 'undefined'
      ) {
        formData.append('renterSSN', this.AddUnitForm.get('renterSSN')?.value);
      }

      if (this.selectedImages['image1']) {
        formData.append('image1', this.selectedImages['image1']);
      }
      if (this.selectedImages['image2']) {
      formData.append('image2', this.selectedImages['image2']);
     }
    if (this.selectedImages['image3']) {
     formData.append('image3', this.selectedImages['image3']);
    }


      console.log(formData)
      this._unitsService.AddUnit(formData).subscribe({
        next:(res)=>{
          console.log(res);
          this.toastr.success("Your new unit is added successfully")
          this._router.navigate(['/ownerHome/units'])

        },
        error:(err)=>{
          console.log(err)
          this.apiError=err.error.message
          this.toastr.error("Can't add your unit")
        }
      })
    }
    else
    {
      this.AddUnitForm.markAllAsTouched()
    }
  }


}
