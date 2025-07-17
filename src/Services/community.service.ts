import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../interfaces/community';

  export interface Comm {
      Name:string
  }
  
@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  _httpClien=inject(HttpClient)



  updateCommunity(communityName: Comm): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClien.put<any>(`http://localhost:5267/api/Community/`, communityName, { headers });
    }

    GetCommunityName(): Observable<Community> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClien.get<Community>(`http://localhost:5267/api/Community/`, { headers });
    }
}
