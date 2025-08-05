import { EditPostComponent } from './../edit-post/edit-post.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Owner } from '../../interfaces/owner';
import { AuthService } from '../../Services/auth.service';
import { Comm, CommunityService } from '../../Services/community.service';
;

@Component({
  selector: 'app-owner-info',
  imports: [ReactiveFormsModule],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.scss'
})
export class OwnerInfoComponent implements OnInit {
  user:Owner={
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    image:'',
    compLocation:[]
  }

  currentName!:string
  EditNameForm!: FormGroup; 
  newName!:Comm
  openToEdit:boolean=false

  
  _communityService=inject(CommunityService)
  _authService=inject(AuthService);
  _fb=inject(FormBuilder)

  ngOnInit(): void {
    this.GetUserdata();
    this.getCommunityName();
  }

  GetUserdata() {
    this._authService.GetUserInfo().subscribe({
      next: (response) => {
        this.user = response;
        console.log('User data fetched successfully:', response);
        
      } ,
      error: (error) => {
        console.error('Error fetching user data:', error);
      }       
  })

}


getCommunityName()
{
  this._communityService.GetCommunityName().subscribe({
          next: res => {
            this.currentName=res.name
            
          },
          error: err => {
            console.error(err);
          }
        });
  
}

openToEditComm():void
{
  this.openToEdit=true
    this.EditNameForm = new FormGroup({
    Name: new FormControl(this.currentName, Validators.required),
  });
}

closeEdit():void{
  this.openToEdit=false;
}

UpdateName()
{
if(this.EditNameForm.valid)
{
        this.newName=this.EditNameForm.value
        this._communityService.updateCommunity(this.newName).subscribe({
        next: res => {
          this.openToEdit=false
          this.getCommunityName()
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