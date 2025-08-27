import { Post } from './post.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from '../interfaces/user-login';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Owner } from '../interfaces/owner';
import { AddAds } from './advertisement.service';
import { Resetpass } from '../interfaces/resetpass';
import { environment } from '../environments/environment';


export interface editImage{
  success:boolean,
  message:string,
  data?:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl=environment.apiUrl;
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
      return this._HttpClient.post(`${this.baseUrl}/Account/Register`,info);
  }

  Login(info:UserLogin):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/Account/Login`,info);
  }

  GetUserInfo():Observable<Owner>{
    const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.get<Owner>(`${this.baseUrl}/Account/GetUserInfo`, {headers});
  }

  saveUser()
  {
    const token=localStorage.getItem("token")!
    this.userData.next(token)
  }
  ResetPassword(resetPassword:Resetpass):Observable<AddAds>{
    return this._HttpClient.post<AddAds>(`${this.baseUrl}/Account/reset-password`,resetPassword);
  }
  RequestResetPassword(email:string):Observable<AddAds>{
    return this._HttpClient.get<AddAds>(`${this.baseUrl}/Account/requestPasswordreset/${email}`);
  }

  EditUserImage(info:FormData):Observable<editImage>{
    const headers=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem("token")}`);
    return this._HttpClient.post<editImage>(`${this.baseUrl}/Account/editImage`,info, {headers});
  }

  Logout(){
    localStorage.removeItem("token")
    localStorage.clear();
    this.userData.next('')
    this._router.navigate(['./login'])
  }
}
