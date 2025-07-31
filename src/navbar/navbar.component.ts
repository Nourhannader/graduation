import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationDropdownComponent } from '../notification/notification-dropdown.component';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterOutlet, CommonModule, NotificationDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean=false
isShow:boolean=false
role!:string
image!:string
userName!:string
_authService=inject(AuthService)
_router=inject(Router)



constructor(){

  this._authService.userData.subscribe({
    next:(res)=>{
      this.isLoggedIn =res ? true : false;
      console.log(res)
    }
  })
}

ngOnInit():void{
  this.role = localStorage.getItem('role')!
  this.image=localStorage.getItem('image')!
  this.userName=localStorage.getItem('userName')!
}


logout() {
  this._authService.Logout();
  //window.location.reload();
  this._router.navigate(['/login']);
}
navigateToHome(){
  if(this.role === 'Owner'){
    this._router.navigate(['/ownerHome'])
    this.isShow=false
  }else{
    this._router.navigate(['/RenterHome'])
    this.isShow=false
  }
}
ShowDrop(){
  this.isShow=!this.isShow
}
}
