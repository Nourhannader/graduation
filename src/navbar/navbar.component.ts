import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean=false
role!:string
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
}


logout() {
  this._authService.Logout();
  //window.location.reload();
  this._router.navigate(['/login']);
}
}
