import { Component, inject, OnInit } from '@angular/core';
import { Owner } from '../../interfaces/owner';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-owner-top-bar',
  imports: [],
  templateUrl: './owner-top-bar.component.html',
  styleUrl: './owner-top-bar.component.css'
})
export class OwnerTopBarComponent implements OnInit {
   user:Owner={
       firstName: '',
       lastName: '',
       userName: '',
       email: '',
       image:'',
       compLocation:[]
     }
  _authService=inject(AuthService);

  imageName: string | undefined ;
  image1: string | undefined;

  ngOnInit(): void {
    this.GetUserdata();
  }

 GetUserdata() {
    this._authService.GetUserInfo().subscribe({
      next: (response) => {
        this.user = response;
        this.imageName = response.image;
        this.image1 = `http://localhost:5267/Images/${this.imageName}`;
        console.log('User data fetched successfully:', response);
        
      } ,
      error: (error) => {
        console.error('Error fetching user data:', error);
      } 
    });
  }

}
