import { Router } from '@angular/router';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comm, CommunityService } from '../../Services/community.service';
import { Community } from '../../interfaces/community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner-edit-community',
  imports: [ReactiveFormsModule],
  templateUrl: './owner-edit-community.component.html',
  styleUrl: './owner-edit-community.component.css'
})

export class OwnerEditCommunityComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  currentName!:string
  EditNameForm!: FormGroup; 
  newName!:Comm
  _communityService=inject(CommunityService)
  _router=inject(Router)

  ngOnInit(): void {
   const sub= this._communityService.GetCommunityName().subscribe({
        next: res => {
          this.currentName=res.name
          
        },
        error: err => {
          console.error(err);
        }
      });
        this.subscriptions.push(sub);
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
       const sub= this._communityService.updateCommunity(this.newName).subscribe({
        next: res => {
          // console.log(res)
          this._router.navigate(['/ownerHome/units'])
          
        },
        error: err => {
          console.error(err);
        }
      });
      this.subscriptions.push(sub);
    } else {
      this.EditNameForm.markAllAsTouched();
    }
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }


}
