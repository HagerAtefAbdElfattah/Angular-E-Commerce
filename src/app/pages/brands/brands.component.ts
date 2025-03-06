import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { error } from 'console';
import { Brand } from '../../core/interfaces/Product';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brandsList: Brand[] = []

  constructor(private brandService:BrandService) { }
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(){ 
    this.brandService.getAllBrands().subscribe({
      next:(res)=>{console.log(res);
        this.brandsList = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
