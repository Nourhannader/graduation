
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { Review } from '../../interfaces/review';
import { RatingstarComponent } from '../ratingstar/ratingstar.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-review',
  imports: [RatingstarComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit ,OnDestroy{
    private subscriptions: Subscription[] = [];
   reviews:Review[]=[];
   review!:Review
   userName: string | null | undefined;
   currentSlideIndex: number = 0;
   length:number=4;
   loading:boolean=false

  _ReviewService=inject(ReviewService)


  constructor(private toastr: ToastrService){}
  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
    this.loading=true
    setTimeout(() => {
       this.getAllReview();
    }, 1000);
   

  }


  getAllReview(){
   const sub= this._ReviewService.getAllReviews().subscribe({
      next:(data) => {
        this.reviews=data
        this.review=this.reviews[this.currentSlideIndex]
       this.loading=false
       
      },error:(err)=>{
        this.loading=false
      }
    })
    this.subscriptions.push(sub);
  
  }
  

  getTimeDifference(publishDate: string | Date): string {
  const now = new Date();
  const published = new Date(publishDate);
  const diffMs = now.getTime() - published.getTime(); 

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day(s)`;
  if (diffHours > 0) return `${diffHours} hour(s)`;
  if (diffMinutes > 0) return `${diffMinutes} minute(s)`;
  return `just now`;
}

  nextSlide() {
    if (this.currentSlideIndex < this.reviews.length - 1) {
      this.currentSlideIndex++;
      this.review=this.reviews[this.currentSlideIndex]
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.review=this.reviews[this.currentSlideIndex]
    }
  }

  delete(id:number){
    const sub=  this._ReviewService.delete(id).subscribe({
        next:(res)=>{
          setTimeout(() => {
          this.toastr.success(`${res.message}`);
          
        }, 500);
         this.prevSlide();
         this.reviews=this.reviews.filter(r=>r.id!=id)
        },error:(err)=>{
          setTimeout(() => {
          this.toastr.error(`${err.message}`);
        }, 500);
        }
      })
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }
}
