import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner-side-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './owner-side-bar.component.html',
  styleUrl: './owner-side-bar.component.css'
})
export class OwnerSideBarComponent implements OnInit,OnDestroy{

   private subscriptions: Subscription[] = [];
  firstName:string=''
  lastName:string=''
  email:string=''
  userName:string=''

  _authService = inject(AuthService);

  ngOnInit(): void {
    this.GetUserdata();
  }

  GetUserdata() {
   const sub= this._authService.GetUserInfo().subscribe({
      next: (response) => {
        this.firstName=response.firstName
        this.lastName=response.lastName
        this.email=response.email
        this.userName=response.userName

      } ,
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
  })
    this.subscriptions.push(sub);
}
ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }
}
