import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  step:number = 1

  constructor(private AuthService:AuthService, private router:Router){}

  forgetPasswordEmailForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email])
  });

  resetCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  });
  
  newPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.minLength(8)])
  })

  forgetPassword(){
    this.newPasswordForm.get('email')?.patchValue(this.forgetPasswordEmailForm.get('email')?.value)

    this.AuthService.forgetPassword(this.forgetPasswordEmailForm.value).subscribe({
      next:(res)=>{
        this.step = 2
        console.log(res);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  resetCode(){
    this.AuthService.confirmCode(this.resetCodeForm.value).subscribe({
      next:(res)=>{
        this.step = 3
        console.log(res);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  changePassword(){
    this.AuthService.resetPassword(this.newPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken',res.token)
        this.router.navigate(['/home']);
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
