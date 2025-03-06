import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  getAllSubCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/subcategories`)
  }

  getSpecificSubCategory(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/subcategories/${id}`)
  }

  SubCategoryOnCategory(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/categories/${id}/subcategories`)
  } 
}
