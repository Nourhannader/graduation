import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ReviewService } from '../Services/review.service';
import { GetStartedService, RenterSSN } from '../Services/get-started.service';
import { Renter } from '../interfaces/renter';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-renter-home',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './renter-home.component.html',
  styleUrl: './renter-home.component.css'
})
export class RenterHomeComponent implements OnInit ,OnDestroy {
  private subscriptions: Subscription[] = [];
  _authService = inject(AuthService);
  _reviewService = inject(ReviewService); 
  _getStartedService = inject(GetStartedService); 

  renter!: Renter;
  isNew: boolean =false;
  addReview: boolean = false;
  start: boolean = false;
  SSN:RenterSSN = { SSN: '' };
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  showPopup:boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;


  GetStartedForm: FormGroup = new FormGroup({
    SSN: new FormControl(null, [Validators.required,Validators.pattern(/^[1-9][0-9]{13}$/)]),  
  });

  AddReviewForm:FormGroup=new FormGroup({
    content:new FormControl(null,[Validators.required]),  
    rate:new FormControl(null,[Validators.required,Validators.min(1)]),
  });

  constructor(private toastr: ToastrService){}
  

  ngOnInit(): void {
    this.GetUserdata();
  }

  GetUserdata() {
   const sub= this._authService.GetUserInfo().subscribe({
      next: (response) => {
        this.renter = response;
        if(this.renter.communityId==null)
        {
          this.isNew=true;
        }
        // console.log('User data fetched successfully:', response);
        
      } ,
      error: (error) => {
        // console.error('Error fetching user data:', error);
      }       
  })
  this.subscriptions.push(sub);
  
}


// show review form
showAddReview() {
  this.addReview = true;

}

submitReview() {
  if (this.AddReviewForm.valid) {
    const formData = new FormData();
    formData.append('content', this.AddReviewForm.get('content')?.value);
    formData.append('rate', this.AddReviewForm.get('rate')?.value);

   const sub= this._reviewService.addReview(formData).subscribe({
      next: (response) => {
        // console.log('Review added successfully:', response);
        this.AddReviewForm.reset();
        this.addReview = false;
        this.toastr.success("Your review has been added successfully.")

      },
      error: (error) => {
        // console.error('Error adding review:', error);
        this.toastr.error("Failed to add your review.")
      }
    });
    this.subscriptions.push(sub);
  }
}

/////cancel
cancelReview()
{
  this.addReview = false;
  this.AddReviewForm.reset();
}

//////get started
showGetStarted()
{
  this.start = true;  
}

cancelGetStarted()
{
  this.start = false;
  this.GetStartedForm.reset()
  // this.isNew = false; 
}


submitGetStarted() {
  if (this.GetStartedForm.valid) {
    const formData = new FormData();

    formData.append('SSN', this.GetStartedForm.get('SSN')?.value);            
    
    this.SSN.SSN = this.GetStartedForm.get('SSN')?.value; 
    // console.log(this.SSN);
   const sub= this._getStartedService.GetStarted(formData).subscribe({
      next: (response) => {
        // console.log('Get started data submitted successfully:', response);
        this.GetStartedForm.reset();
        this.start = false;
        this.isNew = false; 
        this.toastr.success("Submitted successfully")
      },
      error: (error) => {
        console.error('Error submitting get started data:', error);
        this.toastr.error("Failed to submit your ID")
      }
    });
    this.subscriptions.push(sub);
  }

}

/////
setRate(rating: number) {
  this.selectedRating = rating;
  this.AddReviewForm.get('rate')?.setValue(rating);
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
        this.renter.image = res.data! ; 
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