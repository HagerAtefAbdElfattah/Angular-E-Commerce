import { Component, HostListener } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {

  isLoading:boolean = false;

  errorMessage:string = '';

  constructor(private authService:AuthService, private router:Router,private toastr: ToastrService){}

  registerForm:FormGroup = new FormGroup({

    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z0-9]{5,8}$/)]),
    rePassword: new FormControl(null,Validators.required),
    phone: new FormControl(null,[Validators.required,Validators.minLength(11),Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),

  },this.confirmPassword);

  confirmPassword(form:AbstractControl){
    let password = form.get('password')?.value;
    let rePassword = form.get('rePassword')?.value;
    if(password === rePassword){
      return null;
    }
    return {notSame:true};
  }

  alertClose(){
    this.errorMessage = '';
  }


  submit(){
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
          this.toastr.success(res.message, 'Success');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },error:(err)=>{
          console.log(err);
          this.isLoading = false;
          this.errorMessage = err.error.message
          this.toastr.error(err.error.message, 'Error');
          this.registerForm.reset();
        }
      });
    }else{
      this.registerForm.markAllAsTouched();
    }
  }


}
