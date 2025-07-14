import { Observable } from 'rxjs';
import { Unit } from '../Interface/unit';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  _HttpClient=inject(HttpClient)

  constructor() { }

  getAllUnit(): Observable<Unit[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit[]>('http://localhost:5267/api/Unit', { headers });
}

getUnitById(id:number): Observable<Unit> {

  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit>(`http://localhost:5267/api/Unit/${id}`, { headers });
}

  AddUnit(info:FormData):Observable<any>{
      const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);

      return this._HttpClient.post('http://localhost:5267/api/Unit',info,{headers});
  }
  

  filterUnits(status:string,type:string):Observable<Unit[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Unit[]>(`http://localhost:5267/api/Unit/filter?status=${status}&type=${type}`, { headers });
  }

  deleteUnit(id:number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.delete(`http://localhost:5267/api/Unit/${id}`, { headers });
  }

  


}


//http://localhost:5267/api/Unit
//http://localhost:5267/api/Unit/{id}
//http://localhost:5267/api/Unit/filter?status={status}&type={type}
