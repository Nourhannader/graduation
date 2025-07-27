
import { Component, inject, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { Review } from '../../interfaces/review';
import { RatingstarComponent } from '../ratingstar/ratingstar.component';




@Component({
  selector: 'app-review',
  imports: [RatingstarComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
   reviews:Review[]=[];
   review!:Review
   userName: string | null | undefined;
   currentSlideIndex: number = 0;
   length:number=4;

  _ReviewService=inject(ReviewService)


  constructor(){}
  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
    this.getAllReview();
    this.review=this.reviews[this.currentSlideIndex]
  }



  getAllReview(){
    this.reviews= this._ReviewService.reviews;
  
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
    alert("Clicked ID: " + id);
  }

}
