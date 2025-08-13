import { EditPostComponent } from './../edit-post/edit-post.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Owner } from '../../interfaces/owner';
import { AuthService } from '../../Services/auth.service';
import { Comm, CommunityService } from '../../Services/community.service';
import { Subscription } from 'rxjs';
;

@Component({
  selector: 'app-owner-info',
  imports: [ReactiveFormsModule],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.scss'
})
export class OwnerInfoComponent implements OnInit ,OnDestroy{
  private subscriptions: Subscription[] = [];
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
  showPopup:boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  
  _communityService=inject(CommunityService)
  _authService=inject(AuthService);
  _fb=inject(FormBuilder)

  ngOnInit(): void {
    this.GetUserdata();
    this.getCommunityName();
  }

  GetUserdata() {
   const sub= this._authService.GetUserInfo().subscribe({
      next: (response) => {
        this.user = response;
        console.log('User data fetched successfully:', response);
        
      } ,
      error: (error) => {
        console.error('Error fetching user data:', error);
      }       
  })
    this.subscriptions.push(sub);

}


getCommunityName()
{
 const sub=  this._communityService.GetCommunityName().subscribe({
          next: res => {
            this.currentName=res.name
            
          },
          error: err => {
            console.error(err);
          }
        });
  this.subscriptions.push(sub);
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
      const sub= this._communityService.updateCommunity(this.newName).subscribe({
        next: res => {
          this.openToEdit=false
          this.getCommunityName()
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

onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Preview
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }
  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('Image', this.selectedFile);

   const sub= this._authService.EditUserImage(formData).subscribe({
      next: (res) => {
        this.user.image = res.data! ; 
        localStorage.setItem('image',res.data!)
        this.closePopup();
      },
      error: err => console.error(err)
    });
    this.subscriptions.push(sub);
  }

  closePopup() {
    this.showPopup = false;
    this.selectedFile = null;
    this.previewUrl = null;
  }
  ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }
}