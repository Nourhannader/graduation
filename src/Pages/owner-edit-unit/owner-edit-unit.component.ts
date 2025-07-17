import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitsService } from '../../Services/units.service';

@Component({
  selector: 'app-owner-edit-unit',
  imports: [ReactiveFormsModule],
  templateUrl: './owner-edit-unit.component.html',
  styleUrl: './owner-edit-unit.component.css'
})
export class OwnerEditUnitComponent implements OnInit {
  EditUnitForm!: FormGroup; 
  selectedImages: { [key: string]: File } = {};
  existingImages = {
    image1: '',
    image2: '',
    image3: ''
  };
  unitId!: number
  _unitService=inject(UnitsService)
  _router=inject(Router)
  _activatedRoute=inject(ActivatedRoute)

  ngOnInit(): void {
    this.unitId=Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this._unitService.getUnitById(this.unitId).subscribe(unit => {
      this.existingImages = {
        image1: `http://localhost:5267/Images/${unit.image1}`,
        image2: `http://localhost:5267/Images/${unit.image2}`,
        image3: `http://localhost:5267/Images/${unit.image3}`
      };

      this.EditUnitForm = new FormGroup({
        status: new FormControl(unit.status, Validators.required),
        description: new FormControl(unit.description, Validators.required),
        type: new FormControl(unit.type, Validators.required),
        price: new FormControl(unit.price, Validators.required),
        renterSSN: new FormControl(unit.renterSSN || ''),
        image1: new FormControl(null),
        image2: new FormControl(null),
        image3: new FormControl(null)

      });
    });
  }

  onFileSelected(event: any, key: string) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImages[key] = file;
    }
  }

  UpdateUnit() {
    if (this.EditUnitForm.valid) {
      console.log(this.EditUnitForm)
      const formData = new FormData();
      formData.append('status', this.EditUnitForm.get('status')?.value);
      formData.append('description', this.EditUnitForm.get('description')?.value);
      formData.append('type', this.EditUnitForm.get('type')?.value);
      formData.append('price', this.EditUnitForm.get('price')?.value);

      if (this.EditUnitForm.get('status')?.value === 'busy') {
        formData.append('renterSSN', this.EditUnitForm.get('renterSSN')?.value);
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

      this._unitService.EditUnit(this.unitId, formData).subscribe({
        next: res => {
          console.log(formData);
          console.log(res)
          this._router.navigate(['ownerHome/units']);
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.EditUnitForm.markAllAsTouched();
    }
  }
}

