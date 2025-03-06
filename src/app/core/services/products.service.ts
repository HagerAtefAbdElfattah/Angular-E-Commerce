import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl:string = 'https://ecommerce.routemisr.com';

  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/products`);
  }

  getSpecificProduct(id:String):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
}
