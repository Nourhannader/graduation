import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from '../interfaces/user-login';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Owner } from '../interfaces/owner';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<string>=new BehaviorSubject('')
  _HttpClient=inject(HttpClient)
  _pLATFORM_ID=inject(PLATFORM_ID)

  _router=inject(Router)

  constructor() { 
if(isPlatformBrowser(this._pLATFORM_ID))
{
  if(localStorage.getItem("token"))
  {
    this.userData.next(localStorage.getItem("token")!)
  }
}
  }

  register(info:FormData):Observable<any>{
      return this._HttpClient.post('http://localhost:5267/api/Account/Register',info);
  }

  Login(info:UserLogin):Observable<any>{
    return this._HttpClient.post('http://localhost:5267/api/Account/Login',info);
  }

  GetUserInfo():Observable<Owner>{
    const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Owner>('http://localhost:5267/api/Account/GetUserInfo', {headers});
  }

  saveUser()
  {
    const token=localStorage.getItem("token")!
    this.userData.next(token)
  }

  Logout(){
    localStorage.removeItem("token")
    localStorage.clear();
    this.userData.next('')
    this._router.navigate(['./login'])
  }
}
