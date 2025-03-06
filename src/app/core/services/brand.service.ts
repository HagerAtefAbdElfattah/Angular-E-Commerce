import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }
  
  getAllBrands():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/brands`);
  }

  getSpecificBrand(id:string){
    this.http.get(`${this.baseUrl}/api/v1/brands/${id}`)
  }
}
