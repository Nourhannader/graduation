import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ReviewService } from '../Services/review.service';
import { GetStartedService, RenterSSN } from '../Services/get-started.service';
import { Renter } from '../interfaces/renter';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-renter-home',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './renter-home.component.html',
  styleUrl: './renter-home.component.css'
})
export class RenterHomeComponent implements OnInit {

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


  GetStartedForm: FormGroup = new FormGroup({
    SSN: new FormControl(null, [Validators.required,Validators.pattern(/^[1-9][0-9]{13}$/)]),  
  });

  AddReviewForm:FormGroup=new FormGroup({
    content:new FormControl(null,[Validators.required]),  
    rate:new FormControl(null,[Validators.required,Validators.pattern(/^[1-5]$/)])
  });

  constructor(private toastr: ToastrService){}
  

  ngOnInit(): void {
    this.GetUserdata();
  }

  GetUserdata() {
    this._authService.GetUserInfo().subscribe({
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

    this._reviewService.addReview(formData).subscribe({
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
    this._getStartedService.GetStarted(formData).subscribe({
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
  }

}

/////
setRating(rating: number) {
  this.selectedRating = rating;
  this.AddReviewForm.get('rate')?.setValue(rating);
}


}