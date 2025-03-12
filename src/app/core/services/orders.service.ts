import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Checkout } from '../interfaces/checkout';
import { UserTokenData } from '../interfaces/user-token-data';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  baseUrl:string = environment.baseUrl

  token:string = localStorage.getItem('userToken') as string

  userId!: UserTokenData

onlinePayment(id:string, form:Checkout):Observable<any> {
  return this.http.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=https://angular-e-commerce-nine.vercel.app`,{
    "shippingAddress":form
},{
  headers:{
    "token":this.token
  }})
} 

decodeToken() {
  this.userId = jwtDecode(this.token)
}

getUserOrder(userId:string):Observable<any> {
  return this.http.get(`${this.baseUrl}/api/v1/orders/user/${userId}`)
}
}
