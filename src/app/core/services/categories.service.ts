import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl:string = environment.baseUrl

  constructor(private http:HttpClient) { }

  getCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(id:String):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/categories/${id}`);
  }
}
