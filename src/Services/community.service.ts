import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../interfaces/community';
import { UserCommunity } from '../interfaces/user-community';
import { TopUser } from '../interfaces/top-user';

  export interface Comm {
      Name:string
  }

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

 _httpClient=inject(HttpClient)

updateCommunity(communityName: Comm): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClient.put<any>(`http://localhost:5267/api/Community/`, communityName, { headers });
    }

    GetCommunityName(): Observable<Community> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClient.get<Community>(`http://localhost:5267/api/Community/`, { headers });
    }

    GetUserCommunity(): Observable<UserCommunity> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClient.get<UserCommunity>(`http://localhost:5267/api/Community/UserCommunity`, { headers });
    }

   GetTopUsers(): Observable<TopUser[]> {
  const headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem("token")}`
  );

  return this._httpClient.get<TopUser[]>(
    `http://localhost:5267/api/Community/topActive`,
    { headers }
  );
}


}
