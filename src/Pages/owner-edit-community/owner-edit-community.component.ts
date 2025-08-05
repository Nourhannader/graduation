import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comm, CommunityService } from '../../Services/community.service';
import { Community } from '../../interfaces/community';

@Component({
  selector: 'app-owner-edit-community',
  imports: [ReactiveFormsModule],
  templateUrl: './owner-edit-community.component.html',
  styleUrl: './owner-edit-community.component.css'
})

export class OwnerEditCommunityComponent {
  currentName!:string
  EditNameForm!: FormGroup; 
  newName!:Comm
  _communityService=inject(CommunityService)
  _router=inject(Router)

  ngOnInit(): void {
    this._communityService.GetCommunityName().subscribe({
        next: res => {
          this.currentName=res.name
          
        },
        error: err => {
          console.error(err);
        }


        
      });

        this.EditNameForm = new FormGroup({
        Name: new FormControl(this.currentName, Validators.required),
        
      });

}


UpdateName(){
  if(this.EditNameForm.valid)
{
        //console.log(this.EditNameForm.value)
        this.newName=this.EditNameForm.value
        //console.log(this.newName)
        this._communityService.updateCommunity(this.newName).subscribe({
        next: res => {
          // console.log(res)
          this._router.navigate(['/ownerHome/units'])
          
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.EditNameForm.markAllAsTouched();
    }
}




}
