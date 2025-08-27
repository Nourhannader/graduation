
import { Observable } from 'rxjs';
import { Review } from './../interfaces/review';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';



export interface DeleteReview{
  message:string;
}

@Injectable({
  providedIn: 'root'
})


export class ReviewService {
  private baseUrl=environment.apiUrl;
  _HttpClient=inject(HttpClient)

  constructor() {
   }

  getAllReviews():Observable<Review[]>{
    return this._HttpClient.get<Review[]>(`${this.baseUrl}/Review`)
  }

  delete(id:number):Observable<DeleteReview>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete<DeleteReview>(`${this.baseUrl}/Review/${id}`, { headers });
  }
  
  addReview(info: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post(`${this.baseUrl}/Review`, info, { headers });
  }
}
