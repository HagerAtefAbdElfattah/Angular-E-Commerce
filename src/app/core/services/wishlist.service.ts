import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  getWishlist():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/wishlist`);
  }

  addToWishlist(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
    }
    );
  }

  removeFromWishlist(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/api/v1/wishlist/${id}`);
  }
}
