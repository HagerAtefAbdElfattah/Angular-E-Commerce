import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserTokenData } from '../interfaces/user-token-data';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = environment.baseUrl

  userTokenData! : UserTokenData |null

  constructor(private http:HttpClient, private router:Router) { }

  register(form:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/auth/signup`,form);
  }

  login(form:any):Observable<any>{    
    return this.http.post(`${this.baseUrl}/api/v1/auth/signin`,form);
  }

  decodeToken(){
    const token = localStorage.getItem('userToken') as string ;
    this.userTokenData = jwtDecode(token)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.userTokenData=null
  }

  forgetPassword(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }

  confirmCode(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}

