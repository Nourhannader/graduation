import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup
  apiError:string=''
  showConfirmPassword: boolean = false;
  showPassword:boolean=false;
  registrationSuccess: boolean = false;
  selectedRole: string = 'Renter';
  fileName: string = 'Upload Profile Image';

  @ViewChild('doorLeft') doorLeft!: ElementRef;
  @ViewChild('doorRight') doorRight!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;


  _fb = inject(FormBuilder);
  _router = inject(Router);
  _AuthService=inject(AuthService)

  constructor(private cd: ChangeDetectorRef ){
    this.registerForm=this._fb.group({
      firstName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+$/)]],
      userName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20), Validators.pattern(/^[A-Za-z0-9_]+$/)]],
      phone: ['',[ Validators.pattern(/^(01)[0-9]{9}$/)]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',[Validators.required]],
      imageFile: [''], 
      role: ['Renter',[Validators.required]]
    },{
       validators:this.passwordMatchedConfirmPassword
    })
  }

  get userName() {
    return this.registerForm.get('userName');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  

  passwordMatchedConfirmPassword(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;

  if (password && confirm && password !== confirm) {
    form.get('confirmPassword')?.setErrors({ misMatch: true });
  } else {
    const errors = form.get('confirmPassword')?.errors;
    if (errors) {
      delete errors['misMatch'];
      if (Object.keys(errors).length === 0) {
        form.get('confirmPassword')?.setErrors(null);
      } else {
        form.get('confirmPassword')?.setErrors(errors);
      }
    }
  }
   return null;
}

 openDoor() {
  this.doorLeft.nativeElement.classList.add('door-open-left');
  this.doorRight.nativeElement.classList.add('door-open-right');
  setTimeout(() => {
    this.overlay.nativeElement.style.display = 'none';
  }, 500);
 }
 updateRole(Role:string){
   this.selectedRole=Role
  this.registerForm.patchValue({ role: Role });
 }

 togglePassword(){
  this.showPassword=!this.showPassword;
 }

 toggleConfirmPassword(){
  this.showConfirmPassword=!this.showConfirmPassword;
 }


  updateFileName(event : Event):void{
    const input= event.target as HTMLInputElement
    const file = input.files?.[0];
    if (file) {
    this.fileName = file.name;
    this.registerForm.patchValue({ imageFile: file });
    }
  }
 
 Register(){

   if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const formData = new FormData();

    formData.append('FirstName', this.registerForm.get('firstName')?.value);
    formData.append('LastName', this.registerForm.get('lastName')?.value);
    formData.append('UserName', this.registerForm.get('userName')?.value);
    formData.append('Email', this.registerForm.get('email')?.value);
    formData.append('Phone', this.registerForm.get('phone')?.value ?? '');
    formData.append('Password', this.registerForm.get('password')?.value);
    formData.append('ConfirmPassword', this.registerForm.get('confirmPassword')?.value);
    formData.append('Role', this.selectedRole);

    const file = this.registerForm.get('imageFile')?.value;
    if (file) {
      formData.append('ImageFile', file); 
    }
    console.log(formData);
    
      this._AuthService.register(formData).subscribe({
        next:(res)=>{
          console.log(res);
          this.registrationSuccess=!this.registrationSuccess;

             this._router.navigate(['/login']);
        },error:(err) => {
          console.log(err);
           this.apiError=err.error.Error[0];
        }
      })
      
   }else{
    this.registerForm.markAllAsTouched();
   }
 }

 Login(){
  this._router.navigate(['/login'])
 }

}
