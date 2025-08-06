import { Component } from '@angular/core';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [AdminSideBarComponent,RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

}
