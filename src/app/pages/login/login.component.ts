import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading:boolean = false

  errMessage:string = ''

  constructor(private authService:AuthService,private router:Router,private toastr: ToastrService){}

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.minLength(8)])
  })

  alertClose(){
    this.errMessage = '';
  }

  submit(){
    console.log(this.loginForm);

    this.isLoading = true

    this .authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading = false
        this.toastr.success(res.message, 'Success');
        localStorage.setItem('userToken',res.token)
        this.authService.decodeToken()
        console.log(this.authService.userTokenData);
        this.router.navigate(['/home']);
      },error:(err)=>{
        console.log(err);
        this.isLoading = false
        this.errMessage = err.error.message
      }
    })
  }

}
