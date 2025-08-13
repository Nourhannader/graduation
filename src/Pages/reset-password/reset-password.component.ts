
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Resetpass } from '../../interfaces/resetpass';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit ,OnDestroy {
  private subscriptions: Subscription[] = [];
  email!: string;
  token!: string;
  newPassword!: string;
  passwordForm!: FormGroup
  showPassword:boolean=false;
  newResetPass!:Resetpass
  loading:boolean=false
  _fb = inject(FormBuilder);
  _router = inject(Router);
  _AuthService=inject(AuthService)

  constructor(private route: ActivatedRoute,private toastr: ToastrService) {
    this.passwordForm=this._fb.group({
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  get password() {
    return this.passwordForm.get('password');
  }

  togglePassword(){
  this.showPassword=!this.showPassword;
 }

  async resetPassword() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
     this.newResetPass = {
     email: this.email,
     token: this.token,
     newPassword: this.password?.value
     };

     this.loading=true
    await this.delay(1000);
    const sub= this._AuthService.ResetPassword(this.newResetPass).subscribe({
        next: (res) =>{
          this.toastr.success(res.message)
          this.loading=false
          this._router.navigate(['/login'])
        },error: (err) =>{
          this.toastr.error("failed reset password");
          console.log(err);
          
          this.loading=false
        }
     })
    this.subscriptions.push(sub);
      
   }else{
    this.passwordForm.markAllAsTouched();
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
