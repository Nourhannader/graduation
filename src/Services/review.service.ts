
import { Observable } from 'rxjs';
import { Review } from './../interfaces/review';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



export interface DeleteReview{
  message:string;
}

@Injectable({
  providedIn: 'root'
})


export class ReviewService {
  
  _HttpClient=inject(HttpClient)

  constructor() {
   }

  getAllReviews():Observable<Review[]>{
    return this._HttpClient.get<Review[]>('http://livana.runasp.net/api/Review')
  }

  delete(id:number):Observable<DeleteReview>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<DeleteReview>(`http://livana.runasp.net/api/Review/${id}`, { headers });
  }
  
  addReview(info: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post('http://livana.runasp.net/api/Review', info, { headers });
  }
}
