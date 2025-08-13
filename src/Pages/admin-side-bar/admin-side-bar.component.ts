import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-admin-side-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.scss'
})
export class AdminSideBarComponent {

  _AuthService= inject(AuthService);

  LogOut(){
    this._AuthService.Logout();}
}
