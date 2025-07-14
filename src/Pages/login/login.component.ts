import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../Interface/user-login';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup
  apiError:string=''
  showPassword:boolean=false;

  _fb = inject(FormBuilder);
  _router = inject(Router);
  _AuthService=inject(AuthService)

  constructor(){
    this.loginForm=this._fb.group({
      identifier: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  get identifier() {
    return this.loginForm.get('identifier');
  }
  get password() {
    return this.loginForm.get('password');
  }
  
  togglePassword(){
   this.showPassword=!this.showPassword;
  }
 ForgotPassword(){

 }
 Login(){
   if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    const uerLogin: UserLogin = {
      password: this.loginForm.value.password
    }
    if(this.loginForm.value.identifier.includes('@')){
      uerLogin.email=this.loginForm.value.identifier; 
    }else{  
      uerLogin.userName=this.loginForm.value.identifier; 
    }
    
    this._AuthService.Login(uerLogin).subscribe({
      next:(response)=>{
        console.log(response);
          localStorage.setItem('token',response.token);
          this._router.navigate(['/ownerHome']);
      },error:(err)=>{
        console.log(err);
        this.apiError=err.error.Error[0];
      }
    })
   }else{
    this.loginForm.markAllAsTouched();
   }
 }

 Register(){
  this._router.navigate(['/register']);
 }
}
