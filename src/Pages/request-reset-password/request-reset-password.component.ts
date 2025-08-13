import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.scss'
})
export class RequestResetPasswordComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  EmailForm!: FormGroup
  loading:boolean=false
  _fb = inject(FormBuilder);
  _router = inject(Router);
  _AuthService=inject(AuthService)

  constructor(private toastr: ToastrService) {
    this.EmailForm=this._fb.group({
      email: ['',[Validators.required, Validators.email]]
    })
  }

  get email() {
    return this.EmailForm.get('email');
  }

  async SendEmail() {
    if (this.EmailForm.valid) {
      console.log(this.EmailForm.value);
     this.loading=true
    await this.delay(1000);
    const sub= this._AuthService.RequestResetPassword(this.email?.value).subscribe({
        next: (res) =>{
          this.toastr.success(res.message)
          this.loading=false
        },error: (err) =>{
          this.toastr.error("failed reset password");
          console.log(err);
          
          this.loading=false
        }
     })
    this.subscriptions.push(sub);
      
   }else{
    this.EmailForm.markAllAsTouched();
   }
    
  }
   delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}  
ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
 }
}

