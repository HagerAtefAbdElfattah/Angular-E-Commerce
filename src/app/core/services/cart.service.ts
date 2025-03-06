import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl:string = environment.baseUrl

  userToken =localStorage.getItem('userToken') as string

  constructor(private http:HttpClient) { }

  addToCart(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/cart`,
      {
        "productId": id
    }
    );
  }

  getCart():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/cart`)
  }

  removeProduct(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/api/v1/cart/${id}`)
  }

  updateProduct(id:string,count:number):Observable<any>{
    return this.http.put(`${this.baseUrl}/api/v1/cart/${id}`,
      {
        "count": count
    }
    )
  }

  clearCart():Observable<any>{
    return this.http.delete(`${this.baseUrl}/api/v1/cart`,)
  }
}
