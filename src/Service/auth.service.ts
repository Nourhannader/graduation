import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../Interface/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   _HttpClient=inject(HttpClient)
  constructor() { }

  register(info:FormData):Observable<any>{
      return this._HttpClient.post('http://localhost:5267/api/Account/Register',info);
  }

  Login(info:UserLogin):Observable<any>{
    return this._HttpClient.post('http://localhost:5267/api/Account/Login',info);
  }

  GetUserInfo():Observable<any>{
    const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get('http://localhost:5267/api/Account/GetUserInfo', {headers});
  }

  Logout(){
    localStorage.removeItem("token");
  }
}
