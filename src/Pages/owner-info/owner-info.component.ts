import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Owner } from '../../interfaces/owner';
import { AuthService } from '../../Services/auth.service';
;

@Component({
  selector: 'app-owner-info',
  imports: [ReactiveFormsModule],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.scss'
})
export class OwnerInfoComponent implements OnInit {
  user:Owner={
    firstName: '',
    lastName: '',
    userName: '',
    email: ''
  }
  _authService=inject(AuthService);
  _fb=inject(FormBuilder)

  ngOnInit(): void {
    this.GetUserdata();
  }

  GetUserdata() {
    this._authService.GetUserInfo().subscribe({
      next: (response) => {
        this.user = response;
        console.log('User data fetched successfully:', response);
        
      } ,
      error: (error) => {
        console.error('Error fetching user data:', error);
      }       
  })

}
}