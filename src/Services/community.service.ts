import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../interfaces/community';
import { UserCommunity } from '../interfaces/user-community';
import { TopUser } from '../interfaces/top-user';
import { environment } from '../environments/environment';

  export interface Comm {
      Name:string
  }

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
 private baseUrl=environment.apiUrl;
 _httpClient=inject(HttpClient)

updateCommunity(communityName: Comm): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClient.put<any>(`${this.baseUrl}/Community/`, communityName, { headers });
    }

    GetCommunityName(): Observable<Community> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClient.get<Community>(`${this.baseUrl}/Community/`, { headers });
    }

    GetUserCommunity(): Observable<UserCommunity> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      return this._httpClient.get<UserCommunity>(`${this.baseUrl}/Community/UserCommunity`, { headers });
    }

   GetTopUsers(): Observable<TopUser[]> {
  const headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem("token")}`
  );

  return this._httpClient.get<TopUser[]>(
    `${this.baseUrl}/Community/topActive`,
    { headers }
  );
}


}
