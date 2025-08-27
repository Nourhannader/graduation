import { Observable } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from '../interfaces/unit';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  private baseUrl=environment.apiUrl;
  _HttpClient=inject(HttpClient)

  constructor() { }

  getAllUnit(): Observable<Unit[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit[]>(`${this.baseUrl}/Unit`, { headers });
}

getUnitById(id:number): Observable<Unit> {

  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit>(`${this.baseUrl}/Unit/${id}`, { headers });
}

  AddUnit(info:FormData):Observable<any>{
      const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);

      return this._HttpClient.post(`${this.baseUrl}/Unit`,info,{headers});
  }
  

  filterUnits(status:string,type:string):Observable<Unit[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit[]>(`${this.baseUrl}/Unit/filter?status=${status}&type=${type}`, { headers });
  }

  searchUnits(searchTerm: string): Observable<Unit[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit[]>(`${this.baseUrl}/Unit/Search?searchTerm=${searchTerm}`, { headers });
  }

  deleteUnit(id:number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete(`${this.baseUrl}/Unit/${id}`, { headers });
  }

      EditUnit(id:number,info:FormData):Observable<any>
  {
      const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);

      return this._HttpClient.put(`${this.baseUrl}/Unit/${id}`,info, {headers});
  }



}


//http://localhost:5267/api/Unit
//http://localhost:5267/api/Unit/{id}
//http://localhost:5267/api/Unit/filter?status={status}&type={type}
//http://localhost:5267/api/Unit/Search?searchTerm={searchTerm}
